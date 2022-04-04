// GET/products
/*
[
    {
        "id": 66642,
        "campus": "hr-rfc",
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140.00",
        "created_at": "2022-03-31T21:13:15.875Z",
        "updated_at": "2022-03-31T21:13:15.875Z"
    },
    {
        "id": 66643,
        "campus": "hr-rfc",
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": "69.00",
        "created_at": "2022-03-31T21:13:15.875Z",
        "updated_at": "2022-03-31T21:13:15.875Z"
    },
    {
        "id": 66644,
        "campus": "hr-rfc",
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": "40.00",
        "created_at": "2022-03-31T21:13:15.875Z",
        "updated_at": "2022-03-31T21:13:15.875Z"
    },
    {
        "id": 66645,
        "campus": "hr-rfc",
        "name": "Slacker's Slacks",
        "slogan": "Comfortable for everything, or nothing",
        "description": "I'll tell you how great they are after I nap for a bit.",
        "category": "Pants",
        "default_price": "65.00",
        "created_at": "2022-03-31T21:13:15.875Z",
        "updated_at": "2022-03-31T21:13:15.875Z"
    },
    {
        "id": 66646,
        "campus": "hr-rfc",
        "name": "Heir Force Ones",
        "slogan": "A sneaker dynasty",
        "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
        "category": "Kicks",
        "default_price": "99.00",
        "created_at": "2022-03-31T21:13:15.875Z",
        "updated_at": "2022-03-31T21:13:15.875Z"
    }
]
*/

// GET /products/:product styles (for product #:66646)
/*
{
    "product_id": "66646",
        "results": [
            {
                "style_id": 411559,
                "name": "White & White",
                "original_price": "99.00",
                "sale_price": null,
                "default?": true,
                "photos": [
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                    }
                ],
                "skus": {
                    "2390483": {
                        "quantity": 14,
                        "size": "7"
                    },
                    "2390484": {
                        "quantity": 25,
                        "size": "7.5"
                    },
                    "2390485": {
                        "quantity": 9,
                        "size": "8"
                    },
                    "2390486": {
                        "quantity": 2,
                        "size": "8.5"
                    },
                    "2390487": {
                        "quantity": 18,
                        "size": "9"
                    },
                    "2390488": {
                        "quantity": 12,
                        "size": "9.5"
                    },
                    "2390489": {
                        "quantity": 10,
                        "size": "10"
                    },
                    "2390490": {
                        "quantity": 18,
                        "size": "10.5"
                    },
                    "2390491": {
                        "quantity": 11,
                        "size": "11"
                    },
                    "2390492": {
                        "quantity": 35,
                        "size": "11.5"
                    },
                    "2390493": {
                        "quantity": 25,
                        "size": "12"
                    }
                }
            },
            {
                "style_id": 411560,
                "name": "White & Red",
                "original_price": "99.00",
                "sale_price": null,
                "default?": false,
                "photos": [
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1474494819794-90f9664b530d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1474494819794-90f9664b530d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1428790031246-698d71b6fe3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1428790031246-698d71b6fe3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1524604519054-2365ac11e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1524604519054-2365ac11e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1430390456011-25ac9244999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1430390456011-25ac9244999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                    }
                ],
                "skus": {
                    "2390494": {
                        "quantity": 14,
                        "size": "7"
                    },
                    "2390495": {
                        "quantity": 25,
                        "size": "7.5"
                    },
                    "2390496": {
                        "quantity": 9,
                        "size": "8"
                    },
                    "2390497": {
                        "quantity": 2,
                        "size": "8.5"
                    },
                    "2390498": {
                        "quantity": 18,
                        "size": "9"
                    },
                    "2390499": {
                        "quantity": 12,
                        "size": "9.5"
                    },
                    "2390500": {
                        "quantity": 10,
                        "size": "10"
                    },
                    "2390501": {
                        "quantity": 18,
                        "size": "10.5"
                    },
                    "2390502": {
                        "quantity": 11,
                        "size": "11"
                    },
                    "2390503": {
                        "quantity": 35,
                        "size": "11.5"
                    },
                    "2390504": {
                        "quantity": 25,
                        "size": "12"
                    }
                }
            },
            {
                "style_id": 411561,
                "name": "White & Black",
                "original_price": "99.00",
                "sale_price": null,
                "default?": false,
                "photos": [
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1542702942-161ceb2e3d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1542702942-161ceb2e3d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1503449377594-32dd9ac4467c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1503449377594-32dd9ac4467c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1457968867385-9f877f3f2bce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1457968867385-9f877f3f2bce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1469617833234-8a6843da14d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1469617833234-8a6843da14d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2764&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1499852848443-3004d6dc4cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1499852848443-3004d6dc4cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1511499008188-de491bbbae98?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1511499008188-de491bbbae98?ixlib=rb-1.2.1&auto=format&fit=crop&w=988&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1522653216850-4f1415a174fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1522653216850-4f1415a174fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1519396317879-83334cb422f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1519396317879-83334cb422f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1517583010307-3f789911b89c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1517583010307-3f789911b89c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1558191053-c03db2757e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1558191053-c03db2757e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1518894781321-630e638d0742?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1518894781321-630e638d0742?ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
                    }
                ],
                "skus": {
                    "2390505": {
                        "quantity": 14,
                        "size": "7"
                    },
                    "2390506": {
                        "quantity": 25,
                        "size": "7.5"
                    },
                    "2390507": {
                        "quantity": 9,
                        "size": "8"
                    },
                    "2390508": {
                        "quantity": 2,
                        "size": "8.5"
                    },
                    "2390509": {
                        "quantity": 18,
                        "size": "9"
                    },
                    "2390510": {
                        "quantity": 12,
                        "size": "9.5"
                    },
                    "2390511": {
                        "quantity": 10,
                        "size": "10"
                    },
                    "2390512": {
                        "quantity": 18,
                        "size": "10.5"
                    },
                    "2390513": {
                        "quantity": 11,
                        "size": "11"
                    },
                    "2390514": {
                        "quantity": 35,
                        "size": "11.5"
                    },
                    "2390515": {
                        "quantity": 25,
                        "size": "12"
                    }
                }
            },
            {
                "style_id": 411562,
                "name": "White & Blue",
                "original_price": "99.00",
                "sale_price": null,
                "default?": false,
                "photos": [
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1553981834-a23f5b69e3ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1553981834-a23f5b69e3ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1531091087823-cb600a47ab79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1531091087823-cb600a47ab79?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1514613818067-e207c3441db0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1514613818067-e207c3441db0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1503146695898-afdf8ce5d5a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1503146695898-afdf8ce5d5a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1512023983263-7e94bf6b913e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1512023983263-7e94bf6b913e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1501813722636-45de2fe4f9b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1501813722636-45de2fe4f9b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1558682596-dea9bf84c219?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1558682596-dea9bf84c219?ixlib=rb-1.2.1&auto=format&fit=crop&w=2098&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1504281623087-1a6dd8f827c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1504281623087-1a6dd8f827c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
                    },
                    {
                        "thumbnail_url": "https://images.unsplash.com/photo-1462833867037-0f06eab31cc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                        "url": "https://images.unsplash.com/photo-1462833867037-0f06eab31cc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                    }
                ],
                "skus": {
                    "2390516": {
                        "quantity": 14,
                        "size": "7"
                    },
                    "2390517": {
                        "quantity": 25,
                        "size": "7.5"
                    },
                    "2390518": {
                        "quantity": 9,
                        "size": "8"
                    },
                    "2390519": {
                        "quantity": 2,
                        "size": "8.5"
                    },
                    "2390520": {
                        "quantity": 18,
                        "size": "9"
                    },
                    "2390521": {
                        "quantity": 12,
                        "size": "9.5"
                    },
                    "2390522": {
                        "quantity": 10,
                        "size": "10"
                    },
                    "2390523": {
                        "quantity": 18,
                        "size": "10.5"
                    },
                    "2390524": {
                        "quantity": 11,
                        "size": "11"
                    },
                    "2390525": {
                        "quantity": 35,
                        "size": "11.5"
                    },
                    "2390526": {
                        "quantity": 25,
                        "size": "12"
                    }
                }
            }
        ]
}
*/

// GET/qa/questions (for product #:66646)
const qListData = {
  product_id: '66646',
  results: [
    {
      question_id: 583174,
      question_body: 'Why is this product cheaper here than other sites?',
      question_date: '2018-10-18T00:00:00.000Z',
      asker_name: 'willsmith',
      question_helpfulness: 4,
      reported: false,
      answers: {
        5448526: {
          id: 5448526,
          body: 'We are selling it here without any markup from the middleman!',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'Seller',
          helpfulness: 4,
          photos: [],
        },
      },
    },
    {
      question_id: 583175,
      question_body: 'How long does it last?',
      question_date: '2019-06-28T00:00:00.000Z',
      asker_name: 'funnygirl',
      question_helpfulness: 2,
      reported: false,
      answers: {
        5448528: {
          id: 5448528,
          body: 'Some of the seams started splitting the first time I wore it!',
          date: '2019-11-28T00:00:00.000Z',
          answerer_name: 'sillyguy',
          helpfulness: 6,
          photos: [],
        },
        5448536: {
          id: 5448536,
          body: '9 lives',
          date: '2019-11-12T00:00:00.000Z',
          answerer_name: 'iluvdogz',
          helpfulness: 31,
          photos: [
            'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          ],
        },
      },
    },
    {
      question_id: 583173,
      question_body: 'What fabric is the top made of?',
      question_date: '2018-06-17T00:00:00.000Z',
      asker_name: 'funnygirl',
      question_helpfulness: 1,
      reported: false,
      answers: {
        5448459: {
          id: 5448459,
          body: 'Supposedly suede, but I think its synthetic',
          date: '2018-01-17T00:00:00.000Z',
          answerer_name: 'sillyguy',
          helpfulness: 1,
          photos: [],
        },
        5448471: {
          id: 5448471,
          body: "Something pretty soft but I can't be sure",
          date: '2018-01-17T00:00:00.000Z',
          answerer_name: 'sillyguy',
          helpfulness: 4,
          photos: [
            'https://images.unsplash.com/photo-1526880792616-4217886b9dc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
            'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
          ],
        },
        5448473: {
          id: 5448473,
          body: 'Its the best! Seriously magic fabric',
          date: '2018-01-17T00:00:00.000Z',
          answerer_name: 'sillyguy',
          helpfulness: 6,
          photos: [],
        },
        5448486: {
          id: 5448486,
          body: 'Suede',
          date: '2018-01-17T00:00:00.000Z',
          answerer_name: 'sillyguy',
          helpfulness: 0,
          photos: [],
        },
      },
    },
    {
      question_id: 583171,
      question_body: 'Can I wash it?',
      question_date: '2017-01-04T00:00:00.000Z',
      asker_name: 'luaulover',
      question_helpfulness: 1,
      reported: false,
      answers: {
        5448468: {
          id: 5448468,
          body: "I've thrown it in the wash and it seems fine",
          date: '2017-01-04T00:00:00.000Z',
          answerer_name: 'skilover',
          helpfulness: 1,
          photos: [
            'https://images.unsplash.com/photo-1469504512102-900f29606341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
            'https://images.unsplash.com/photo-1510551310160-589462daf284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80',
          ],
        },
        5448469: {
          id: 5448469,
          body: 'It says not to',
          date: '2017-01-04T00:00:00.000Z',
          answerer_name: 'skilover',
          helpfulness: 2,
          photos: [],
        },
        5448470: {
          id: 5448470,
          body: 'Yes',
          date: '2017-01-04T00:00:00.000Z',
          answerer_name: 'skilover',
          helpfulness: 3,
          photos: [],
        },
        5448501: {
          id: 5448501,
          body: "I wouldn't machine wash it",
          date: '2017-11-04T00:00:00.000Z',
          answerer_name: 'skilover',
          helpfulness: 5,
          photos: [],
        },
        5448513: {
          id: 5448513,
          body: 'Only if you want to ruin it!',
          date: '2017-11-04T00:00:00.000Z',
          answerer_name: 'skilover',
          helpfulness: 5,
          photos: [],
        },
      },
    },
    {
      question_id: 583172,
      question_body: 'Where is this product made?',
      question_date: '2018-07-06T00:00:00.000Z',
      asker_name: 'bballfan',
      question_helpfulness: 0,
      reported: false,
      answers: {
        5448485: {
          id: 5448485,
          body: 'Canada',
          date: '2018-08-06T00:00:00.000Z',
          answerer_name: 'footballfan',
          helpfulness: 9,
          photos: [],
        },
      },
    },
  ],
};
export default qListData;
