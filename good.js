class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvaible(available){
        this.available = available
    }

}

class GoodsList {
    #goods
    constructor(filter, sortPrice, sortDir) {
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list() {
        const forSaleList = this.#goods.filter(good => this.filter.test(good.name));

        if (!this.sortPrice) {
            return forSaleList;
        }

        if (this.sortDir) {
            return forSaleList.sort((a, b) => (a.price - b.price));
        }
        return forSaleList.sort((a, b) => (b.price - a.price));
    }

    add(newGood) {
        this.#goods.push(newGood);
    }

    remove(id) {
        const getIndex = this.#goods.findIndex(good => good.id === id);
        if (getIndex != undefined) {
            this.#goods.splice(getIndex, 1);
        }
        return getIndex;
    }
}

const tshirt = new Good(1, "Футболка", "цвет: с красным принтом, черная", ["S", "M", "XL"], 400, true);
const coats = new Good(2, "Пальто", "цвет: коричневое, белое", ["S", "M", "L"], 3000, true);
const showcases = new Good(3, "Шорты", "цвет: красные, бежевые", ["XS", "M", "XXL"], 1000, true);
const sandals = new Good(4, "Сандали", "цвет: черные", ["S", "M", "L", "XL"], 500, true);
const jeans = new Good(5, "Джинсы", "цвет: синие, серые", ["L", "XL"], 800, true);


const catalog = new GoodsList(/Джинсы/i, true, false);

sandals.setAvaible(false)

catalog.add(tshirt);
catalog.add(coats);
catalog.add(showcases);
catalog.add(sandals);
catalog.add(jeans);


catalog.sortPrice = true;
catalog.sortDir = false;

// console.log(catalog.list)

class BasketGood extends Good {

    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {

    constructor() {
        this.goods = []
    }

    get totalAmount() {
        return this.goods.map(item => item.amount).reduce((a, b) => a + b, 0)
    }

    get totalSum() {
        return this.goods.reduce((a, b) => a + b.amount * b.price, 0);
    }

    add(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            this.goods[index].amount += amount;
        } else {
            let addGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(addGood);
        }
    }

    remove(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            if (this.goods[index].amount - amount <= 0 || amount === 0) {
                this.goods.splice(index, 1);
            } else {
                this.goods[index].amount -= amount;
            }
        }
    }

    clear() {
        this.goods.length = 0;
    }

    removeUnavailable() {

        this.goods.filter(item => {if (item.available === false){
            const index = this.goods.indexOf(item)
            return this.goods.splice(index,1)
        }});
    }

}

const basket = new Basket();

basket.add(tshirt,3)
basket.add(coats,1)
basket.add(showcases,1)
basket.add(sandals,2)
basket.add(jeans,3)
console.log(basket.goods)

basket.remove(jeans,2)
basket.removeUnavailable()
console.log(basket.goods)


console.log(basket.totalSum)
console.log(basket.totalAmount)
//
// basket.clear()
// console.log(basket.goods)

