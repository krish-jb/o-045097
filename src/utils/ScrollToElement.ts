const scrollToElement = (elementId: string) => {
    if (elementId === "home") {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    } else {
        const element = document.getElementById(elementId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: "smooth",
            });
        }
    }
};

export default scrollToElement;
