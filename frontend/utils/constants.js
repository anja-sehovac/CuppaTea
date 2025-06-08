var Constants = {
    get_api_base_url: function () {
        if (location.hostname === "localhost" ) {
            return "http://localhost/web_project/backend";
        } else {
            return "https://cuppatea-vv3qj.ondigitalocean.app";
        }
    },
    USER_ROLE: "user",
    ADMIN_ROLE: "admin"
};