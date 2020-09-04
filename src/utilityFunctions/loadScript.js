export default () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = process.env.REACT_APP_STRIPE_API_URL;
        script.onload = () => resolve();
        document.getElementsByTagName("head")[0].appendChild(script);
        console.log("Script has been added to the head");
    });
};
