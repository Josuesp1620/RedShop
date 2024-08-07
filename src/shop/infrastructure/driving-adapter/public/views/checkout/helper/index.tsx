import { useAppSelector } from "@/core/redux/hooks"
import { AddressEntity, OrderEntity, OrderLineEntity, ProductItemEntity, ShopEntity } from "@/shop/domain/entities"
import { OrderStatus } from "@/shop/domain/enums"
import { useQueryClient } from "@tanstack/react-query"
import { useFormik } from "formik"
import * as Yup from "yup";
import { ImplementationAxios as AxiosOrder } from "@/shop/infrastructure/implementation/axios/order";
import { ImplementationAxios as AxiosAddress } from "@/shop/infrastructure/implementation/axios/address";

import { CreateUseCase as CreateOrder, GetNextCodeUseCase as GetNextCodeOrder} from "@/shop/application/use_cases/order";
import { CreateUseCase as CreateAddress } from "@/shop/application/use_cases/address"
import { UseLocalContext } from "@/core/context/UseLocalContext"
import { CartHelper } from "@/common/components/cart/helper"
import { useNavigate } from "react-router-dom"
import { OrderPaymentEntity } from "@/shop/domain/entities/OrderPayment"
import React from "react"
import { toast } from "sonner"

export const CheckoutHelper = () => {
    const { stateUser } = UseLocalContext()
    const { resetProductsCart } = CartHelper({setData: false})

    const [paymentMethod, setPaymentMethod] = React.useState<string | null >(null)

    const queryClient =  useQueryClient()
    const shop_profile : ShopEntity | undefined = queryClient.getQueryData(['shop_profile'])
    const orders : OrderEntity[] | undefined = queryClient.getQueryData(['query_order_list'])
    const cart_products : ProductItemEntity[] | undefined = queryClient.getQueryData(['query_product_list'])
    const filter_product_cart = cart_products?.filter((product) => product.in_cart === true)
    const cart_price = useAppSelector((state) => state.cartReducer)
    const navigate = useNavigate()

    const validation :any = useFormik({
        initialValues: {            
            first_name:  "",
            last_name:  "",
            phone_number:  "",
            email:  "",
            street: "",
            city: "",
            state: "",
            postal_code: "",
            country: "Peru",
        },
        validationSchema: Yup.object().shape({            
            first_name: Yup.string().required("First Name is required."), 
            last_name: Yup.string().required("Last Name is required."), 
            phone_number: Yup.string().required("Phone Number is required."), 
            email: Yup.string().required("Address is required."), 
            street: Yup.string().required("Street is required."), 
            city: Yup.string().required("City is required."), 
            state: Yup.string().required("State is required."), 
            postal_code: Yup.string(),            
            country: Yup.string().required("Status is required"),
        }),
        onSubmit: () => {            
        },
    });

    const onHandleSubmitOrder = async (event: any) => {
        event.preventDefault();        
        await validation.handleSubmit(event);
        if(Object.keys(await validation.validateForm()).length === 0){            
            if(paymentMethod !== null){
                await createOrder();
            }else {
                toast.error("Debe seleccionar un metodo de pago.")                
            }        
        }else {
            toast.error("Debe rellenar todo el formulario correctament.")
        }
    }


    const createOrder = async () => {
        
        const shop_id = `${import.meta.env.VITE_SHOP_ID}`

        const address_id = await createAddress()!

        const orderLines : OrderLineEntity[] = filter_product_cart?.map((line) => {
            return {
                product_id: line.product?.id,
                quantity: line.quantity,
                unit_price: line.product?.price,
                total_price: line.total_price                
            } as OrderLineEntity
        })!

        const orderPayment : OrderPaymentEntity = {
            image: null,
            payment_method: paymentMethod!
        }
                
        const orderRepository = new AxiosOrder()
        const getNextCode = new GetNextCodeOrder(orderRepository)   
        const order_code = await getNextCode.run(shop_id)
        const newOrder: OrderEntity = {
            order_code,
            shop_id: shop_id,
            customer: stateUser?.id,
            order_date: new Date(),
            status: OrderStatus.PENDING,
            total_amount: cart_price.total_price,
            shipping_address: address_id ? address_id as string : undefined,
            billing_address: address_id ? address_id as string : undefined,
            order_lines: orderLines,
            payment: orderPayment,
        }

        const createOrder = new CreateOrder(orderRepository)
        const response = await createOrder.run(newOrder)
        queryClient.cancelQueries({ queryKey: ['query_order_list'] })
        queryClient.setQueryData(['query_order_list'], [response, ...orders!]) 
        resetProductsCart()
        navigate("/")
    }

    const createAddress = async () : Promise<string | null> =>  {
        try {
            const addressRepository = new AxiosAddress()
            const createAddress = new CreateAddress(addressRepository);
            const newAddress : AddressEntity = {                    
                ...validation.values,
            }
            const address = await createAddress.run(newAddress);
            return address.id!
        }
        catch {
            return null
        }
    }    

    return {
        filter_product_cart,
        cart_price,
        validation,
        onHandleSubmitOrder,
        shop_profile,
        setPaymentMethod,
    }
}