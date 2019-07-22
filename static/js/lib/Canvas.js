export class Canvas
{
    constructor(width=720, height=480, kwargs={}){
        this.keywordedArgumentHandler = this.keywordedArgumentHandler.bind(this);

        this._canvas = document.createElement('canvas');
        this._canvas.id = "canvas";

        this._canvas.width = width;
        this._canvas.height = height;

        this.keywordedArgumentHandler(kwargs);
    }

    get node() {
        return this._canvas;
    }

    get width() {
        return this._canvas.width;
    }

    set width(value) {
        return this._canvas.width = value;
    }

    get height() {
        return this._canvas.height;
    }

    set height(value) {
        return this._canvas.height = value;
    }

    get context2D() {
        return this._canvas.getContext("2d");
    }

    begin() {
        this.context2D.beginPath();
    }

    clearAll() {
        this.context2D.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    fillStyle(value) {
        this.context2D.fillStyle = value;
    }

    fillRect(dict, debug=false) {
        if (debug) {
            console.log(dict);
        }
        this.context2D.fillRect(dict.x, dict.y, dict.width, dict.height);
    }

    text(text, coords, font=null) {
        const ctx = this.context2D;
        if (font && font["size"] && font["family"]) {
            ctx.font = `${font.size}px ${font.family}`;
        }
        if (font && font["align"]) {
            ctx.textAlign = font.align;
        }
        ctx.fillText(text, coords.x, coords.y);
    }

    keywordedArgumentHandler(kwargs) {
        Object.keys(kwargs).forEach(key => {
            const value = kwargs[key];
            switch (key) {
                case 'append':
                    value.append(this._canvas);
                    break;
                case "styles":
                    const attributes = value;
                    Object.keys(attributes).forEach(attr => {
                        const attributeValue = attributes[attr];
                        this.node.style[attr] = attributeValue;
                    })
                    break;
                default:
                    break;
            }
        })
    }
}