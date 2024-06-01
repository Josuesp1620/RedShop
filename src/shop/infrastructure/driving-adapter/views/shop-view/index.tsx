import React from "react";
import ShopProfileInfo from "../components/profile";
import Tab from "@/common/components/Tab/Tab";
import { Nav } from "@/common/components/Tab/Nav";
import NavItemCustom from "@/common/components/Tab/NavItemCustom";
import { Store } from "../components/tabs-components/store";
import { LayoutPublic } from "@/common/layout_2";
import { ProfileInfo } from "../components/tabs-components/profile-info";
import { Integration } from "../components/tabs-components/integration";

const ShopView = () => {

    return (
        <LayoutPublic>
            <React.Fragment>
                <Tab.Container defaultActiveKey="store-tab">
                    <div className="mt-0 rounded-t-none card">
                        <ShopProfileInfo  className="card-body !px-2.5"/>
                        <div className="card-body !px-2.5 !py-0">
                            <Nav className="flex flex-wrap w-full text-sm font-medium text-center nav-tabs items-center justify-center">
                                <NavItemCustom label="Store" eventKey={'store-tab'}/>  
                                <NavItemCustom label="Profile" eventKey={'profile-tab'}/>  
                                <NavItemCustom label="Integration" eventKey={'integration-tab'}/>  
                            </Nav>
                        </div>
                    </div>
                    <Tab.Content className="tab-content">
                        <Tab.Pane eventKey="store-tab" id="store-tab">                            
                            <Store />
                        </Tab.Pane>
                        <Tab.Pane eventKey="profile-tab" id="profile-tab">                            
                            <ProfileInfo />
                        </Tab.Pane>
                        <Tab.Pane eventKey="integration-tab" id="integration-tab">                            
                            <Integration />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </React.Fragment>
        </LayoutPublic>
    );
}

export default ShopView;