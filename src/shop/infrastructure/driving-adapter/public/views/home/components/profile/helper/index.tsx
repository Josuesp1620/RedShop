import { ChangeEvent } from "react";

import { ImplementationAxios as AxiosShop } from "@/shop/infrastructure/implementation/axios/shop";
import { UpdateImageUseCase } from "@/shop/application/use_cases/shop";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const ProfileInfoHelper = ({ query_shop_profile }: { query_shop_profile: any }) => {

    const queryClient =  useQueryClient()

    const shopRepository = new AxiosShop()
    const shopUseCase = new UpdateImageUseCase(shopRepository)   

    
    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {    
            const file = Array.from(event.target.files!);
            if (file.length !== 0) {                            
                const formData = new FormData()
                formData.append("images", file[0])        

                const data = await shopUseCase.run(query_shop_profile.data!.id, formData)
                
                queryClient.cancelQueries({ queryKey: ['shop_profile'] })
                queryClient.setQueryData(['shop_profile'], data)                 
                toast.success("Datos Actualizados Correctamente.")
            }                        
        }catch(e) {            
            toast.success("Error al actualizar la foto.")
        }      
    };

    return {
        handleImageChange
    }
}