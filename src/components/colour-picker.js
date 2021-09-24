class ColourPicker {
    constructor(materials) {
        this.materials = materials;

        console.log('ColourPicker', this.materials);

        this.initComponents();
        this.bindEvents();
    }

    initComponents() {
        this.swatches = document.querySelectorAll('[data-swatch]');
    }

    bindEvents() {
        this.swatches.forEach((swatch) => {
            swatch.addEventListener('click', () => {
                // TODO: attach events to radio input or the label?
                const style = getComputedStyle(swatch);

                this.materials.materialOne.color.setStyle(style.backgroundColor);
            });
        });
    }
}

export { ColourPicker };
