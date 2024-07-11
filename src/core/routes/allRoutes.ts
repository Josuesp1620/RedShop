import { LoginView } from "@/Auth/infrastructure/driving-adapter/views/login";
import { LogoutView } from "@/Auth/infrastructure/driving-adapter/views/logout";
import AdminView from "@/shop/infrastructure/driving-adapter/dashboard/views";
import { ProductsView } from "@/shop/infrastructure/driving-adapter/dashboard/views/products";
import { CreateProductView } from "@/shop/infrastructure/driving-adapter/dashboard/views/products/create-wizard-product";
import { CheckouView } from "@/shop/infrastructure/driving-adapter/public/views/checkout";
import ShopView from "@/shop/infrastructure/driving-adapter/public/views/home";
import ProductOverView from "@/shop/infrastructure/driving-adapter/public/views/home/components/product_overview";

interface RouteObject {
    path: string;
    component: React.ComponentType<any>;
    exact?: boolean;
}

const publicRoutes: Array<RouteObject> = [
    { path: "/", component: ShopView },
    { path: "/product/:id", component: ProductOverView },
    { path: "/checkout", component: CheckouView },
    { path: "/login", component: LoginView },
    // { path: "/register", component: RegisterView },
    { path: "/logout", component: LogoutView },
    // { path: "/register-wizard", component: RegisterWizardView },
    // { path: "/reset-password", component: ResetPasswordView },
    // { path: "/create-new-password", component: CreatePasswordView },    
    // { path: "/verify-email", component: VerifyEmailView },    
]

const authRoutes: Array<RouteObject> = [
    { path: "/dashboard", component: AdminView },

    // Products
    { path: "/dashboard/product", component: ProductsView },
    { path: "/dashboard/product/create", component: CreateProductView },

    // // Orders
    // { path: "/dashboard/order", component: OrdersView },
]

export { publicRoutes, authRoutes };
