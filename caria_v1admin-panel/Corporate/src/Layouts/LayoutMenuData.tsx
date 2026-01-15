import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(true);
    const [isApps, setIsApps] = useState<boolean>(true);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isPages, setIsPages] = useState<boolean>(false);
    const [isBaseUi, setIsBaseUi] = useState<boolean>(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState<boolean>(false);
    const [isForms, setIsForms] = useState<boolean>(false);
    const [isTables, setIsTables] = useState<boolean>(false);
    const [isCharts, setIsCharts] = useState<boolean>(false);
    const [isIcons, setIsIcons] = useState<boolean>(false);
    const [isMaps, setIsMaps] = useState<boolean>(false);
    const [isMultiLevel, setIsMultiLevel] = useState<boolean>(false);

    // Apps
    const [isCalendar, setCalendar] = useState<boolean>(false);
    const [isEmail, setEmail] = useState<boolean>(false);
    const [isSubEmail, setSubEmail] = useState<boolean>(false);
    const [isEcommerce, setIsEcommerce] = useState<boolean>(true);
    const [isCMS, setIsCMS] = useState<boolean>(true);
    const [isProjects, setIsProjects] = useState<boolean>(false);
    const [isTasks, setIsTasks] = useState<boolean>(true);
    const [isCRM, setIsCRM] = useState<boolean>(true);
    const [isCrypto, setIsCrypto] = useState<boolean>(false);
    const [isInvoices, setIsInvoices] = useState<boolean>(false);
    const [isSupportTickets, setIsSupportTickets] = useState<boolean>(false);
    const [isNFTMarketplace, setIsNFTMarketplace] = useState<boolean>(false);
    const [isJobs, setIsJobs] = useState<boolean>(false);
    const [isJobList, setIsJobList] = useState<boolean>(false);
    const [isCandidateList, setIsCandidateList] = useState<boolean>(false);


    // Authentication
    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);
    const [isPasswordCreate, setIsPasswordCreate] = useState<boolean>(false);
    const [isLockScreen, setIsLockScreen] = useState<boolean>(false);
    const [isLogout, setIsLogout] = useState<boolean>(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
    const [isVerification, setIsVerification] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // Pages
    const [isProfile, setIsProfile] = useState<boolean>(false);
    const [isLanding, setIsLanding] = useState<boolean>(false);
    const [isBlog, setIsBlog] = useState<boolean>(false);

    // Charts
    const [isApex, setIsApex] = useState<boolean>(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState<boolean>(false);
    const [isLevel2, setIsLevel2] = useState<boolean>(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e: any) {
        if (e && e.target && e.target.getAttribute("sub-items")) {
            const ul: any = document.getElementById("two-column-menu");
            const iconItems: any = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("sub-items");
                const getID = document.getElementById(id) as HTMLElement
                if (getID)
                    getID.classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            // setIsDashboard(false); // Retain expanded state
        }
        if (iscurrentState !== 'Apps') {
            // setIsApps(false); // Retain expanded state
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'BaseUi') {
            setIsBaseUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState !== 'Landing') {
            setIsLanding(false);
        }
    }, [
        history,
        iscurrentState
        // isDashboard, // Removed from dependencies to avoid loop if changed
        // isApps,
        // isAuth,
        // isPages,
        // isBaseUi,
        // isAdvanceUi,
        // isForms,
        // isTables,
        // isCharts,
        // isIcons,
        // isMaps,
        // isMultiLevel
    ]);

    const menuItems: any = [
        {
            label: "Menü",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Komuta Merkezi",
            icon: "ri-dashboard-2-line",
            link: "/dashboard",
        },
        {
            id: "properties",
            label: "Gayrimenkul İlanları",
            icon: "ri-home-4-line",
            link: "/apps-ecommerce-products",
        },
        {
            id: "inquiries",
            label: "İlan Talepleri",
            icon: "ri-customer-service-2-line",
            link: "/apps-crm-leads",
        },
        {
            id: "cms",
            label: "Web Sitesi Yönetimi",
            icon: "ri-window-line",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsCMS(!isCMS);
                setIscurrentState('CMS');
                updateIconSidebar(e);
            },
            stateVariables: isCMS,
            subItems: [
                { id: "homepage-mgmt", label: "Anasayfa Blok Yönetimi", link: "/apps-cms-homepage", parentId: "cms" },
                { id: "slider-mgmt", label: "Slider Yönetimi", link: "/apps-cms-sliders", parentId: "cms" },
                { id: "page-content", label: "Sayfa Yönetimi", link: "/apps-cms-content", parentId: "cms" },
                { id: "menu-mgmt", label: "Menü Yönetimi", link: "/apps-cms-menus", parentId: "cms" },
                { id: "advisor-mgmt", label: "Danışman Yönetimi", link: "/apps-cms-advisors", parentId: "cms" },
                { id: "site-settings", label: "Site Ayarları", link: "/apps-cms-content", parentId: "cms" },
                { id: "seo-settings", label: "SEO Ayarları", link: "/apps-cms-seo", parentId: "cms" },
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
