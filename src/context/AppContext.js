import React, { useState, createContext } from "react";
import jwtDecode from 'jwt-decode';
import Menu, {GetRoles} from './MenuList';
import { LiveTvSharp } from "@material-ui/icons";
// Create Context Object
export const AppContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const AppProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('empJWT') || false);
    const decoded = isAuthenticated && jwtDecode(localStorage.getItem('empJWT'));
    const [empId, setEmpId] = useState(decoded && decoded.user?.empUniqueId);
    /**
     * Get menu list
     */
    const [menuLists, setMenuList] = useState([]);
    const getMenuList = (role) => {
        const roles = GetRoles();
        return roles.includes(role) && Menu[role] || Menu.DEFAULT;
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
        //console.log('finalMenu....', finalMenu);
        setMenuList(finalMenu);
        return finalMenu;
    }
    React.useEffect(() => {

        if (decoded.user) {
            setEmpId(decoded.user.empUniqueId);
            let val = getList();
            console.log(val)
            // setMenuList(val);
        }
    }, [decoded.user?.empUniqueId])

    const getActions = () => {
        const actions = [];

    }


    let values = { isAuthenticated, setIsAuthenticated, menuLists, empId, decoded }
    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    );
};
