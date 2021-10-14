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
            swatch.addEventListener('click', (event) => {
                const swatchHex = swatch.dataset.swatch;
                
                this.materials.toasterBody.color.setStyle(swatchHex);

                if(swatchHex == '#d3e4e6'){
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
