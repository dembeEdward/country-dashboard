/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV : 'development' | 'production' | 'test'
        PUBLIC_URL : string
        REACT_APP_DASHBOARD_API : string
        REACT_APP_COUNTRY_DETAILS_API: string,
        REACT_APP_COUNTRY_FLAGS: string,
        REACT_APP_GOOGLE_MAPS: string
    }
}
interface Window {
    Stripe : any
}
