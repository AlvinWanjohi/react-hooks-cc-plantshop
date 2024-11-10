global.fetch = require('node-fetch');

global.basePlants = [
    {
      "id": 1,
      "name": "Aloe",
      "image": "./public/images/aloe.jpg",
      "price": 15.99
    },
    {
      "id": 2,
      "name": "ZZ Plant",
      "image": "./public/images/zz-plant.jpg",
      "price": 25.98
    },
    {
      "id": 3,
      "name": "Pilea peperomioides",
      "image": "./public/images/pilea.jpg",
      "price": 5.99
    },
    {
      "id": 4,
      "name": "Pothos",
      "image": "./public/images/pothos.jpg",
      "price": 12.11
    },
    {
      "id": 5,
      "name": "Jade",
      "image": "./public/images/jade.jpg",
      "price": 10.37
    },
    {
      "id": 6,
      "name": "Monstera Deliciosa",
      "image": "./public/images/monstera.jpg",
      "price": 25.99
    },
    {
      "id": 7,
      "name": "Fiddle Leaf Fig",
      "image": "./public/images/fiddle-leaf-fig.jpg",
      "price": 55
    }
]

global.alternatePlants = [
    {
      "id": 1,
      "name": "Another Aloe",
      "image": "./public/images/aloe.jpg",
      "price": 12.88
    },
    {
      "id": 2,
      "name": "Another Jade",
      "image": "./public/images/jade.jpg",
      "price": 4.92
    },
    {
      "id": 3,
      "name": "Another Fiddle Leaf Fig",
      "image": "./public/images/fiddle-leaf-fig.jpg",
      "price": 55
    }
]
  
global.setFetchResponse = (val) => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(val)
    }))
}
  