export const products = [];

const categories = [
    { name: 'Grocery', keyword: 'grocery' },
    { name: 'Mobiles', keyword: 'smartphone' },
    { name: 'Fashion', keyword: 'clothing' },
    { name: 'Electronics', keyword: 'electronics' },
    { name: 'Home & Furniture', keyword: 'furniture' },
    { name: 'Appliances', keyword: 'appliance' },
    { name: 'Travel', keyword: 'travel' },
    { name: 'Beauty, Toys & More', keyword: 'beauty' }
];

const baseNames = {
    'Grocery': ["Organic Coffee Blend", "Premium Almonds", "Cold Pressed Olive Oil", "Whole Wheat Pasta", "Green Tea Leaves", "Raw Natural Honey", "Peanut Butter Crunchy", "Dark Chocolate Bar", "Oats Breakfast Cereal", "Himalayan Pink Salt", "Assorted Spices Box", "Mixed Fruit Jam", "Basmati Rice Premium", "Quinoa Seeds", "Protein Granola"],
    'Mobiles': ["Smartphone Pro X", "Lite Edition 5G", "Flagship Max Ultra", "Gamer Phone 144Hz", "Foldable Tech Z", "Budget King Y", "Camera Centric V", "Compact Phone Mini", "Battery Monster M", "Rugged Phone R", "Business Stylus Note", "Mid-Range Killer K", "Selfie Expert S", "Performance Plus P", "Sleek Glass G"],
    'Fashion': ["Cotton Graphic Tee", "Classic Denim Jacket", "Sneakers Limited Run", "Vintage Leather Belt", "Summer Floral Dress", "Slim Fit Chinos", "Running Shoes Dri-Fit", "Polarized Sunglasses", "Wool Blend Sweater", "Casual Check Shirt", "Formal Oxford Shoes", "Winter Puffer Jacket", "Ankle Boots Suede", "Designer Watch Minimal", "Athletic Leggings"],
    'Electronics': ["Noise Cancelling Headphones", "4K Action Camera", "Smartwatch OLED", "Wireless Earbuds True", "Portable Bluetooth Speaker", "Curved Gaming Monitor", "Mechanical Keyboard RGB", "Wireless Gaming Mouse", "USB-C Hub Multiport", "Webcam 1080p AutoFocus", "External SSD 1TB", "Drone with 4K Cam", "Tablet Pro 11-inch", "E-Reader Paperwhite", "Power Bank 20000mAh"],
    'Home & Furniture': ["Ergonomic Office Chair", "Modern Coffee Table", "Minimalist Sofa Set", "Memory Foam Mattress", "Wooden Bookshelf", "Bedside Lamp Touch", "Dining Table 6-Seater", "TV Cabinet Console", "Recliner Armchair", "Outdoor Patio Set", "Shoe Rack Organizer", "Velvet Accent Chair", "Nesting Tables 3-Piece", "Queen Size Bed Frame", "Wall Mirror Round"],
    'Appliances': ["Smart Air Purifier", "Microwave Oven Auto", "Robot Vacuum Cleaner", "Coffee Maker Espresso", "Cordless Stick Vacuum", "Induction Cooktop", "Electric Kettle Fast-Boil", "Blender Pros 1000W", "Toaster 4-Slice", "Slow Cooker Digital", "Stand Mixer 5Qt", "Electric Grill Indoor", "Juicer Centrifugal", "Air Fryer 6L Extra", "Water Purifier RO+UV"],
    'Travel': ["Hard Shell Suitcase", "Explorer Travel Backpack", "Memory Foam Neck Pillow", "Packing Cubes Set", "Universal Plug Adapter", "Travel Toiletry Bag", "Digital Luggage Scale", "Passport Holder RFID", "Camping Tent 2-Person", "Sleeping Bag Cold", "Travel Duffel Bag", "Laptop Backpack Waterproof", "TSA Approved Locks", "Travel Umbrella Compact", "Portable Camp Stove"],
    'Beauty, Toys & More': ["Matte Lipstick Velvet", "Remote Control Sports Car", "Advanced Skincare Kit", "Building Blocks Mega", "Educational Board Game", "Hydrating Face Serum", "Eau de Parfum Spray", "Makeup Brush Set", "Action Figure Hero", "Plush Toy Bear", "Drone Toy for Kids", "Vitamin C Face Wash", "Nail Polish Collection", "Puzzle 1000 Pieces", "Electric Toothbrush Sonic"]
};

let idCount = 1;

categories.forEach(catObj => {
    const nameList = baseNames[catObj.name];
    for (let i = 0; i < 15; i++) {
        const randomName = nameList[i];
        const variedPrice = Math.floor(Math.random() * (450 - 20) + 20) + 0.99;
        const variedRating = parseFloat((Math.random() * 1 + 4).toFixed(1));

        products.push({
            id: idCount++,
            name: `${randomName} Gen ${i + 1}`,
            price: variedPrice,
            description: `Experience the best of ${catObj.name.toLowerCase()} with this amazing item. Built with high quality materials and precision to last. Guaranteed satisfaction.`,
            // Unique image per item using loremflickr based on the keyword and ID
            image: `https://loremflickr.com/400/400/${catObj.keyword}?lock=${idCount}`,
            category: catObj.name,
            rating: variedRating,
            reviews: Math.floor(Math.random() * 5000) + 25
        });
    }
});
