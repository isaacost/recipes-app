const ingredientsMock = {
  meals: [
    {
      strMeal: 'Apam balik',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg',
      idMeal: '53049',
    },
    {
      strMeal: 'BBQ Pork Sloppy Joes',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg',
      idMeal: '52995',
    },
    {
      strMeal: 'BeaverTails',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg',
      idMeal: '52928',
    },
    {
      strMeal: 'Beef Rendang',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/bc8v651619789840.jpg',
      idMeal: '53053',
    },
    {
      strMeal: 'Blackberry Fool',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg',
      idMeal: '52891',
    },
    {
      strMeal: 'Bread and Butter Pudding',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/xqwwpy1483908697.jpg',
      idMeal: '52792',
    },
    {
      strMeal: 'Budino Di Ricotta',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1549542877.jpg',
      idMeal: '52961',
    },
    {
      strMeal: 'Carrot Cake',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg',
      idMeal: '52897',
    },
    {
      strMeal: 'Creamy Tomato Soup',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg',
      idMeal: '52841',
    },
    {
      strMeal: 'Egg Drop Soup',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446137.jpg',
      idMeal: '52955',
    },
    {
      strMeal: 'Escovitch Fish',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1520084413.jpg',
      idMeal: '52944',
    },
    {
      strMeal: 'French Onion Chicken with Roasted Carrots & Mashed Potatoes',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/b5ft861583188991.jpg',
      idMeal: '52996',
    },
    {
      strMeal: 'French Onion Soup',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/xvrrux1511783685.jpg',
      idMeal: '52903',
    },
    {
      strMeal: 'Fruit and Cream Cheese Breakfast Pastries',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1543774956.jpg',
      idMeal: '52957',
    },
    {
      strMeal: 'Gigantes Plaki',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/b79r6f1585566277.jpg',
      idMeal: '53012',
    },
    {
      strMeal: 'Home-made Mandazi',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/thazgm1555350962.jpg',
      idMeal: '52967',
    },
    {
      strMeal: 'Hot and Sour Soup',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1529445893.jpg',
      idMeal: '52954',
    },
    {
      strMeal: 'Japanese Katsudon',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/d8f6qx1604182128.jpg',
      idMeal: '53034',
    },
    {
      strMeal: 'Krispy Kreme Donut',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/4i5cnx1587672171.jpg',
      idMeal: '53015',
    },
    {
      strMeal: 'Montreal Smoked Meat',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/uttupv1511815050.jpg',
      idMeal: '52927',
    },
    {
      strMeal: 'New York cheesecake',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/swttys1511385853.jpg',
      idMeal: '52858',
    },
    {
      strMeal: 'Pad See Ew',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
      idMeal: '52774',
    },
    {
      strMeal: 'Pancakes',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
      idMeal: '52854',
    },
    {
      strMeal: 'Peanut Butter Cookies',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1544384070.jpg',
      idMeal: '52958',
    },
    {
      strMeal: 'Pizza Express Margherita',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg',
      idMeal: '53014',
    },
    {
      strMeal: 'Polskie Naleśniki (Polish Pancakes)',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58bkyo1593350017.jpg',
      idMeal: '53022',
    },
    {
      strMeal: 'Pouding chomeur',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/yqqqwu1511816912.jpg',
      idMeal: '52932',
    },
    {
      strMeal: 'Ratatouille',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wrpwuu1511786491.jpg',
      idMeal: '52908',
    },
    {
      strMeal: 'Recheado Masala Fish',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg',
      idMeal: '52809',
    },
    {
      strMeal: 'Seri muka kuih',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/6ut2og1619790195.jpg',
      idMeal: '53054',
    },
    {
      strMeal: 'Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/h3ijwo1581013377.jpg',
      idMeal: '52994',
    },
    {
      strMeal: 'Soy-Glazed Meatloaves with Wasabi Mashed Potatoes & Roasted Carrots',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/o2wb6p1581005243.jpg',
      idMeal: '52992',
    },
    {
      strMeal: 'Strawberry Rhubarb Pie',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/178z5o1585514569.jpg',
      idMeal: '53005',
    },
    {
      strMeal: 'Stuffed Lamb Tomatoes',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/u55lbp1585564013.jpg',
      idMeal: '53008',
    },
    {
      strMeal: 'Sweet and Sour Pork',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1529442316.jpg',
      idMeal: '52949',
    },
    {
      strMeal: 'Thai Green Curry',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg',
      idMeal: '52814',
    },
    {
      strMeal: 'Timbits',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
      idMeal: '52929',
    },
    {
      strMeal: 'Vietnamese Grilled Pork (bun-thit-nuong)',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/qqwypw1504642429.jpg',
      idMeal: '52828',
    },
  ],
};

export default ingredientsMock;
