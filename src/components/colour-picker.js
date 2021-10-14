class ColourPicker {
    constructor(materials) {
        this.materials = materials;

        this.initComponents();
        this.bindEvents();
    }

    initComponents() {
        this.el = document.querySelector('[data-color-picker]');
        this.swatches = document.querySelectorAll('[data-swatch]');
    }

    bindEvents() {
        this.swatches.forEach((swatch) => {
            swatch.addEventListener('click', () => {
                // TODO: attach events to radio input or the label?
                const style = getComputedStyle(swatch);
                console.log(style.backgroundColor);

                this.materials.toasterBody.color.setStyle(style.backgroundColor);
                if(style.backgroundColor == 'rgb(189, 202, 217)'){
                    this.materials.toasterBody.metalness = 1;
                    this.materials.toasterBody.roughness = 1.05;
                }
                else{
                    this.materials.toasterBody.metalness = 0.1;
                    this.materials.toasterBody.roughness = 1;
                }
            });
        });
    }

    render() {
        // show this component
        this.el.classList.remove("hidden");

        this.swatches.forEach((swatch) => {
            console.log(swatch);
            swatch.classList.add('appear');
        });
    }
}

export { ColourPicker };
