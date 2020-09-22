import React, { useState, createContext } from "react";
import jwtDecode from 'jwt-decode';
import Menu from './MenuList';
import { LiveTvSharp } from "@material-ui/icons";
// Create Context Object
export const AppContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const AppProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('empJWT') || false);
    const decoded = isAuthenticated && jwtDecode(localStorage.getItem('empJWT'));
    console.log('decoded..', decoded);
    const [role, setRole] = useState("");
    const [permissions, setPermission] = useState([]);
    const [empId, setEmpId] = useState(decoded && decoded.user?.empUniqueId);
    console.log('empId..', decoded.user?.empUniqueId)
    /**
     * Get menu list
     */
    const [menuLists, setMenuList] = useState([]);
    const getMenuList = (role) => {
        console.log('getMenuList...', role)
        switch (role) {
            case 'ROLE1':
                return Menu[0].role1
            case 'ROLE2':
                return Menu[2].role2
            case 'DEFAULT':
                return Menu[3].default
            default:
                return Menu[1].superadmin;
        }
    }

    const getList = () => {
        let finalMenu = [];
        const roles = ((decoded.user.roles).toString()).split(",");
        for (var i = 0; i < roles.length; i++) {
            const list = getMenuList(roles[i]);
            finalMenu.push(...list)
        }
        const keys = ['href', 'icon', 'title']
        finalMenu = finalMenu.filter(
            (s => o =>
                (k => !s.has(k) && s.add(k))
                    (keys.map(k => o[k]).join('|'))
            )
                (new Set)
        );
        console.log('finalMenu....', finalMenu);
        setMenuList(finalMenu);
        return finalMenu;
    }
    React.useEffect(() => {

        if (decoded.user) {
            setEmpId(decoded.user.empUniqueId);
            let val = getList();
            // setMenuList(val);
        }
    }, [decoded.user?.empUniqueId])




    let values = { isAuthenticated, setIsAuthenticated, menuLists, empId }
    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    );
};
