/**
 * Created by Derwish (derwish.pro@gmail.com) on 04.07.2016.
 * License: http://www.gnu.org/licenses/gpl-3.0.txt
 */

export default class Utils {


    /***
     * Clone object
     * @param obj
     * @param target
     * @returns {any}
     */
    static cloneObject(obj: any, target?: any): any {
        if (obj == null) return null;
        let r = JSON.parse(JSON.stringify(obj));
        if (!target) return r;

        for (let i in r)
            target[i] = r[i];
        return target;
    };


    /**
     * Generate GUID string
     * @returns {string}
     */
    static guid(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }



    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    /**
     * Compare objects
     * @param a
     * @param b
     * @returns {boolean}
     */
    static compareObjects(a: any, b: any): boolean {
        for (let i in a)
            if (a[i] != b[i])
                return false;
        return true;
    }

    /**
     * Calculate distance
     * @param a
     * @param b
     * @returns {number}
     */
    static distance(a: [number, number], b: [number, number]): number {
        return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
    }

    /**
     * Conver color to string
     * @param c
     * @returns {string}
     */
    static colorToString(c: [number, number, number, number]): string {
        return "rgba(" + Math.round(c[0] * 255).toFixed() + "," + Math.round(c[1] * 255).toFixed() + "," + Math.round(c[2] * 255).toFixed() + "," + (c.length == 4 ? c[3].toFixed(2) : "1.0") + ")";
    }

    /**
     * Compute is shape inside a rectangle
     * @param x
     * @param y
     * @param left
     * @param top
     * @param width
     * @param height
     * @returns {boolean}
     */
    static isInsideRectangle(x: number, y: number, left: number, top: number, width: number, height: number): boolean {
        if (left < x && (left + width) > x &&
            top < y && (top + height) > y)
            return true;
        return false;
    }


    /**
     * Grow bounding
     * @param bounding [minx,miny,maxx,maxy]
     * @param x
     * @param y
     */
    static growBounding(bounding: [number, number, number, number], x: number, y: number): void {
        if (x < bounding[0])
            bounding[0] = x;
        else if (x > bounding[2])
            bounding[2] = x;

        if (y < bounding[1])
            bounding[1] = y;
        else if (y > bounding[3])
            bounding[3] = y;
    }


    /**
     * Compute is point inside bounding
     * @param p
     * @param bb
     * @returns {boolean}
     */
    static isInsideBounding(p: [number, number], bb: [number, number, number, number]): boolean {
        if (p[0] < bb[0][0] ||
            p[1] < bb[0][1] ||
            p[0] > bb[1][0] ||
            p[1] > bb[1][1])
            return false;
        return true;
    }


    /**
     * Compute is bounings overlap
     * @param a
     * @param b
     * @returns {boolean}
     */
    static overlapBounding(a: [number, number, number, number], b: [number, number, number, number]): boolean {
        if (a[0] > b[2] ||
            a[1] > b[3] ||
            a[2] < b[0] ||
            a[3] < b[1])
            return false;
        return true;
    }


    /**
     * Convert a hex value to its decimal value - the inputted hex must be in the
     * format of a hex triplet - the kind we use for HTML colours. The function
     * will return an array with three values.
     * @param hex
     * @returns {[number,number,number]}
     */
    static rgbHexToNums(hex: string): [number, number, number] {
        if (hex.charAt(0) == "#") hex = hex.slice(1); //Remove the '#' char - if there is one.

        if (hex.length != 6)
            throw "Cant convert RGB value. Bad HEX!";

        hex = hex.toUpperCase();
        let hex_alphabets = "0123456789ABCDEF";
        let value: [number, number, number] = [0, 0, 0];
        let k = 0;
        let int1, int2;
        for (let i = 0; i < 6; i += 2) {
            int1 = hex_alphabets.indexOf(hex.charAt(i));
            int2 = hex_alphabets.indexOf(hex.charAt(i + 1));

            if (int1 < 0 || int2 < 0)
                throw "Cant convert RGB value. Bad HEX!";

            value[k] = (int1 * 16) + int2;
            k++;
        }
        return value;
    }

    /**
    * Convert a hex value to its decimal value - the inputted hex must be in the
    * format of a hex triplet - the kind we use for HTML colours. The function
    * will return an array with four values.
    * @param hex
    * @returns {[number,number,number,number]}
    */
    static rgbwHexToNums(hex: string): [number, number, number, number] {
        if (hex.charAt(0) == "#") hex = hex.slice(1); //Remove the '#' char - if there is one.

        if (hex.length != 8)
            throw "Cant convert RGBW value. Bad HEX!";

        hex = hex.toUpperCase();
        let hex_alphabets = "0123456789ABCDEF";
        let value: [number, number, number, number] = [0, 0, 0, 0];
        let k = 0;
        let int1, int2;
        for (let i = 0; i < 8; i += 2) {
            int1 = hex_alphabets.indexOf(hex.charAt(i));
            int2 = hex_alphabets.indexOf(hex.charAt(i + 1));

            if (int1 < 0 || int2 < 0)
                throw "Cant convert RGBW value. Bad HEX!";

            value[k] = (int1 * 16) + int2;
            k++;
        }
        return value;
    }

    /**
     * Give a array with three values as the argument and the function will return
     * the corresponding hex triplet.
     * @param triplet
     * @returns {string}
     */
    static numsToRgbHex(triplet: [number, number, number]): string {
        let hex_alphabets = "0123456789ABCDEF";
        let hex = "#";
        let int1, int2;
        for (let i = 0; i < 3; i++) {
            int1 = triplet[i] / 16;
            int2 = triplet[i] % 16;

            hex += hex_alphabets.charAt(int1) + hex_alphabets.charAt(int2);
        }
        return (hex);
    }

    static numsToRgbwHex(triplet: [number, number, number, number]): string {
        let hex_alphabets = "0123456789ABCDEF";
        let hex = "#";
        let int1, int2;
        for (let i = 0; i < 4; i++) {
            int1 = triplet[i] / 16;
            int2 = triplet[i] % 16;

            hex += hex_alphabets.charAt(int1) + hex_alphabets.charAt(int2);
        }
        return (hex);
    }

    /**
     * Extend class
     * @param target
     * @param origin
     */
    static extendClass(target: any, origin: any): void {
        for (let i in origin) //copy class properties
        {
            if (target.hasOwnProperty(i))
                continue;
            target[i] = origin[i];
        }

        if (origin.prototype) //copy prototype properties
            for (let i in origin.prototype) //only enumerables
            {
                if (!origin.prototype.hasOwnProperty(i))
                    continue;

                if (target.prototype.hasOwnProperty(i)) //avoid overwritting existing ones
                    continue;

                //copy getters
                if (origin.prototype.__lookupGetter__(i))
                    target.prototype.__defineGetter__(i, origin.prototype.__lookupGetter__(i));
                else
                    target.prototype[i] = origin.prototype[i];

                //and setters
                if (origin.prototype.__lookupSetter__(i))
                    target.prototype.__defineSetter__(i, origin.prototype.__lookupSetter__(i));
            }
    }

    static formatValue(val: any, type: string): any {
        if (val == null)
            return null;

        if (type == "number" && typeof val != "number") {
            if (typeof val == "boolean")
                return val ? 1 : 0;
            else
                return parseFloat(val) || 0;
        }
        else if (type == "string" && typeof val != "string")
            return "" + val;
        else if (type == "boolean" && typeof val != "boolean")
            return val == true || val == 1 || val == "true";

        return val;
    }

    static formatAndTrimValue(val: any): string {
        if (val == null)
            return "";
        if (typeof (val) == "boolean") {
            return val ? "true" : "false";
        }
        if (typeof (val) == "number") {
            val = parseFloat(val.toFixed(3));
            return "" + val;
        }
        if (typeof (val) == "object") {
            return "[object]";
        }
        if (typeof (val) == "string") {
            if (val.length > 9)
                val = val.substr(0, 9) + "...";
            return val;
        }

        val = "" + val;
        if (val.length > 9)
            val = val.substr(0, 9) + "...";
        return val;
    }


    /**
     * Get current time
     * @returns {number}
     */
    static getTime(): number {
        return (typeof (performance) != "undefined") ? performance.now() : Date.now();
    };


    static toFixedNumber(value, digits) {
        let pow = Math.pow(10, digits);
        return +(Math.round(value * pow) / pow);
    }

    static clamp = function (value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    };

    static remap = function (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
    };
}


