// "use client";

// import useAllOrders from "@/reactQueryHook/getAllOrders";
// import OverViewCardItem from "./OverViewCardItem";
// import useCategories from "@/reactQueryHook/useCategories";
// import useAllClients from "@/reactQueryHook/getAllClients";
// import useAllProducts from "@/reactQueryHook/useAllProducts";
// import useAllSubscriptions from "@/reactQueryHook/getAllSubscriptions";
// import { useMemo, useState } from "react";

// const OverViewCards = () => {
//   const { data: orders, isFetching: isOrdersFetching } = useAllOrders();
//   const { data: categories, isFetching: isCategoriesFetching } =
//     useCategories();
//   const { data: products, isFetching: isProductsFetching } = useAllProducts();
//   const { data: clients, isFetching: isClientsFetching } = useAllClients();
//   const { data: subscriptions, isFetching: isSubscriptionsFetching } =
//     useAllSubscriptions();
//   const totalOrders = orders ? orders.length : 0;
//   const totalRevenue =
//     orders?.reduce((acc, order) => {
//       return acc + order.totalPrice;
//     }, 0) || 0;
//   const [selectValue, setSelectValue] = useState("life");
//   const [selectCommandValue, setSelectCommandValue] = useState("life");
//   const [selectCategoriesValue, setSelectCategoriesValue] = useState("life");
//   const [selectClientsValue, setSelectClientsValue] = useState("life");
//   const [selectSubscriptionsValue, setSelectSubscriptionsValue] =
//     useState("life");

//   const handleSelectChange = (newValue: string) => {
//     setSelectValue(newValue); // Update the state
//   };
//   const handleCommandSelectChange = (newValue: string) => {
//     setSelectCommandValue(newValue); // Update the state
//   };
//   const handleCategoriesSelectChange = (newValue: string) => {
//     setSelectCategoriesValue(newValue); // Update the state
//   };
//   const handleClientsSelectChange = (newValue: string) => {
//     setSelectClientsValue(newValue); // Update the state
//   };
//   const handleSubscriptionsSelectChange = (newValue: string) => {
//     setSelectSubscriptionsValue(newValue); // Update the state
//   };
//   const totalCategories = categories ? categories.length : 0;
//   const totalClients = clients ? clients.length : 0;
//   const totalProducts = products ? products.length : 0;
//   const totalSubscriptions = subscriptions ? subscriptions.length : 0;

//   const filterOrdersByDate = (
//     orders: any[],
//     startDate: Date,
//     endDate: Date
//   ) => {
//     return orders.filter((order) => {
//       const orderDate = new Date(order.createdAt);
//       return orderDate >= startDate && orderDate <= endDate;
//     });
//   };
//   // Calculate today's orders
//   const today = new Date();
//   const startOfToday = new Date(today.setHours(0, 0, 0, 0));
//   const endOfToday = new Date(today.setHours(23, 59, 59, 999));

//   // Calculate this week's orders
//   const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
//   const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));

//   // Calculate this month's orders
//   const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//   const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
//   const startOfYear = new Date(today.getFullYear(), 0, 1);
//   const endOfYear = new Date(today.getFullYear(), 11, 31);
//   // Filter orders for each period
//   const todayOrders = useMemo(
//     () => filterOrdersByDate(orders || [], startOfToday, endOfToday),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   console.log(todayOrders);
//   const todayOrdersRevenue = todayOrders.reduce((acc, order) => {
//     return acc + order.totalPrice;
//   }, 0);
//   console.log(todayOrdersRevenue);
//   const weekOrders = useMemo(
//     () => filterOrdersByDate(orders || [], startOfWeek, endOfWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   console.log(weekOrders);
//   const weekOrdersRevenue = weekOrders.reduce((acc, order) => {
//     return acc + order.totalPrice;
//   }, 0);
//   console.log(weekOrdersRevenue);
//   const monthOrders = useMemo(
//     () => filterOrdersByDate(orders || [], startOfMonth, endOfMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   const monthOrdersRevenue = monthOrders.reduce((acc, order) => {
//     return acc + order.totalPrice;
//   }, 0);
//   console.log(monthOrdersRevenue);
//   const yearOrders = useMemo(
//     () => filterOrdersByDate(orders || [], startOfYear, endOfYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   const yearOrdersRevenue = yearOrders.reduce((acc, order) => {
//     return acc + order.totalPrice;
//   }, 0);
//   // Previous periods for comparison
//   const prevDay = new Date(); // Start with today's date
//   prevDay.setDate(prevDay.getDate() - 1); // Move to the previous day

//   // Start and end of the previous day
//   const startOfPrevDay = new Date(prevDay);
//   startOfPrevDay.setHours(0, 0, 0, 0); // Set to the start of the day

//   const endOfPrevDay = new Date(prevDay);
//   endOfPrevDay.setHours(23, 59, 59, 999); // Set to the end of the day

//   // Filter orders for the previous day
//   const prevDayOrders = useMemo(
//     () => filterOrdersByDate(orders || [], startOfPrevDay, endOfPrevDay),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );

//   console.log(prevDayOrders);
//   const prevDayOrdersRevenue = prevDayOrders.reduce((acc, order) => {
//     return acc + order.totalPrice;
//   }, 0);
//   console.log(prevDayOrdersRevenue);

//   const calculatePercentage = (current: number, previous: number) => {
//     if (previous === 0) return 100; // Avoid division by zero
//     return ((current - previous) / previous) * 100;
//   };

//   const prevWeek = new Date(); // Start with today's date
//   prevWeek.setDate(prevWeek.getDate() - 7); // Move to the same day of the previous week

//   // Start and end of the previous week
//   const startOfPrevWeek = new Date(prevWeek);
//   startOfPrevWeek.setDate(startOfPrevWeek.getDate() - startOfPrevWeek.getDay()); // Start of the week
//   startOfPrevWeek.setHours(0, 0, 0, 0); // Set to the start of the day

//   const endOfPrevWeek = new Date(startOfPrevWeek);
//   endOfPrevWeek.setDate(endOfPrevWeek.getDate() + 6); // End of the week
//   endOfPrevWeek.setHours(23, 59, 59, 999); // Set to the end of the day

//   // Filter orders for the previous week
//   const prevWeekOrders = useMemo(
//     () => filterOrdersByDate(orders || [], startOfPrevWeek, endOfPrevWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );

//   const prevMonth = new Date(); // Start with today's date
//   prevMonth.setMonth(prevMonth.getMonth() - 1); // Move to the previous month

//   const startOfPrevMonth = new Date(prevMonth);
//   startOfPrevMonth.setDate(1); // Start of the month
//   startOfPrevMonth.setHours(0, 0, 0, 0); // Set to the start of the day
//   const endOfPrevMonth = new Date(prevMonth);
//   endOfPrevMonth.setDate(
//     new Date(
//       endOfPrevMonth.getFullYear(),
//       endOfPrevMonth.getMonth() + 1,
//       0
//     ).getDate()
//   ); // End of the month
//   endOfPrevMonth.setHours(23, 59, 59, 999); // Set to the end of the day
//   const prevYear = new Date(); // Start with today's date
//   prevYear.setFullYear(prevYear.getFullYear() - 1); // Move to the previous year

//   // Start and end of the previous year
//   const startOfPrevYear = new Date(prevYear.getFullYear(), 0, 1); // Start of the year
//   const endOfPrevYear = new Date(
//     prevYear.getFullYear(),
//     11,
//     31,
//     23,
//     59,
//     59,
//     999
//   ); // End of the year
//   const prevMonthOrders = useMemo(
//     () => filterOrdersByDate(orders || [], startOfPrevMonth, endOfPrevMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   // Filter orders for the previous year
//   const prevYearOrders = useMemo(
//     () => filterOrdersByDate(orders || [], startOfPrevYear, endOfPrevYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );

//   const prevYearOrdersRevenue = prevYearOrders.reduce((acc, order) => {
//     return acc + order.totalPrice;
//   }, 0);
//   console.log(prevYearOrdersRevenue);
//   const prevWeekOrdersRevenue = prevWeekOrders.reduce((acc, order) => {
//     return acc + order.totalPrice;
//   }, 0);
//   const prevMonthOrdersRevenue = prevMonthOrders.reduce((acc, order) => {
//     return acc + order.totalPrice;
//   }, 0);
//   console.log(prevWeekOrdersRevenue);
//   const todayDiffRevenue = todayOrdersRevenue - prevDayOrdersRevenue;
//   const todayDiff = calculatePercentage(
//     todayOrdersRevenue,
//     prevDayOrdersRevenue
//   );
//   const weekDiff = calculatePercentage(
//     weekOrdersRevenue,
//     prevWeekOrdersRevenue
//   );
//   const monthDiff = calculatePercentage(
//     monthOrdersRevenue,
//     prevMonthOrdersRevenue
//   );
//   const yearDiff = calculatePercentage(
//     yearOrdersRevenue,
//     prevYearOrdersRevenue
//   );
//   const lifeOrdersRevenue = orders?.reduce((acc, order) => {
//     return acc + order.totalPrice;
//   }, 0);
//   console.log(selectValue);
//   const getFilteredData = () => {
//     switch (selectValue) {
//       case "day":
//         return { revenue: todayOrdersRevenue, diff: todayDiff };
//       case "week":
//         return { revenue: weekOrdersRevenue, diff: weekDiff };
//       case "month":
//         return { revenue: monthOrdersRevenue, diff: monthDiff };
//       case "year":
//         return { revenue: yearOrdersRevenue, diff: yearDiff };
//       case "life":
//         return { revenue: lifeOrdersRevenue, diff: 100 };
//       default:
//         return { revenue: todayOrdersRevenue, diff: todayDiff };
//     }
//   };

//   const filteredData = getFilteredData();

//   const todayCommand = useMemo(
//     () => filterOrdersByDate(orders || [], startOfToday, endOfToday),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   const todayCommandNumber = todayCommand.length;
//   const prevDayCommand = useMemo(
//     () => filterOrdersByDate(orders || [], startOfPrevDay, endOfPrevDay),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   const prevDayCommandNumber = prevDayCommand.length;
//   console.log(prevDayCommandNumber);
//   const todayCommandDiff = calculatePercentage(
//     todayCommandNumber,
//     prevDayCommandNumber
//   );

//   const weekCommand = useMemo(
//     () => filterOrdersByDate(orders || [], startOfWeek, endOfWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   const prevWeekCommand = useMemo(
//     () => filterOrdersByDate(orders || [], startOfPrevWeek, endOfPrevWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   const weekCommandNumber = weekCommand.length;
//   const prevWeekNumber = prevWeekCommand.length;
//   console.log(weekCommandNumber);
//   console.log(prevWeekNumber);
//   const weekCommandDiff = calculatePercentage(
//     weekCommandNumber,
//     prevWeekNumber
//   );
//   const monthCommand = useMemo(
//     () => filterOrdersByDate(orders || [], startOfMonth, endOfMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   const prevMonthCommand = useMemo(
//     () => filterOrdersByDate(orders || [], startOfPrevMonth, endOfPrevMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   const monthCommandNumber = monthCommand.length;
//   console.log(monthCommandNumber);
//   const prevMonthCommandNumber = prevMonthCommand.length;
//   console.log(prevMonthCommandNumber);
//   const monthCommandDiff = calculatePercentage(
//     monthCommandNumber,
//     prevMonthCommandNumber
//   );
//   const yearCommand = useMemo(
//     () => filterOrdersByDate(orders || [], startOfYear, endOfYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   const prevYearCommand = useMemo(
//     () => filterOrdersByDate(orders || [], startOfPrevYear, endOfPrevYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orders]
//   );
//   const prevYearCommandNumber = prevYearCommand.length;
//   const yearCommandNumber = yearCommand.length;
//   const yearCommandDiff = calculatePercentage(
//     yearCommandNumber,
//     prevYearCommandNumber
//   );
//   const lifeCommandNumber = orders?.length;

//   const getCommandFilteredData = () => {
//     switch (selectCommandValue) {
//       case "day":
//         return { revenue: todayCommandNumber, diff: todayCommandDiff };
//       case "week":
//         return { revenue: weekCommandNumber, diff: weekCommandDiff };
//       case "month":
//         return { revenue: monthCommandNumber, diff: monthCommandDiff };
//       case "year":
//         return { revenue: yearCommandNumber, diff: yearCommandDiff };
//       case "life":
//         return { revenue: lifeCommandNumber, diff: 100 };
//       default:
//         return { revenue: todayCommandNumber, diff: todayCommandDiff };
//     }
//   };

//   const filteredCommandData = getCommandFilteredData();

//   const todayCategories = useMemo(
//     () => filterOrdersByDate(categories || [], startOfToday, endOfToday),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [categories]
//   );
//   const todayCategoriesNumber = todayCategories.length;
//   const prevDayCategories = useMemo(
//     () => filterOrdersByDate(categories || [], startOfPrevDay, endOfPrevDay),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [categories]
//   );
//   const prevDayCategoriesNumber = prevDayCategories.length;
//   console.log(prevDayCategoriesNumber);
//   const todayCategoriesDiff = calculatePercentage(
//     todayCategoriesNumber,
//     prevDayCategoriesNumber
//   );

//   const weekCategories = useMemo(
//     () => filterOrdersByDate(categories || [], startOfWeek, endOfWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [categories]
//   );
//   const prevWeekCategories = useMemo(
//     () => filterOrdersByDate(categories || [], startOfPrevWeek, endOfPrevWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [categories]
//   );
//   const weekCategoriesNumber = weekCategories.length;
//   const prevWeekCategoriesNumber = prevWeekCategories.length;
//   console.log(weekCategoriesNumber);
//   console.log(prevWeekCategoriesNumber);
//   const weekCategoriesDiff = calculatePercentage(
//     weekCategoriesNumber,
//     prevWeekCategoriesNumber
//   );
//   const monthCategories = useMemo(
//     () => filterOrdersByDate(categories || [], startOfMonth, endOfMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [categories]
//   );
//   const prevMonthCategories = useMemo(
//     () =>
//       filterOrdersByDate(categories || [], startOfPrevMonth, endOfPrevMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [categories]
//   );
//   const monthCategoriesNumber = monthCategories.length;
//   console.log(monthCategoriesNumber);
//   const prevMonthCategoriesNumber = prevMonthCategories.length;
//   console.log(prevMonthCategoriesNumber);
//   const monthCategoriesDiff = calculatePercentage(
//     monthCategoriesNumber,
//     prevMonthCategoriesNumber
//   );
//   const yearCategories = useMemo(
//     () => filterOrdersByDate(categories || [], startOfYear, endOfYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [categories]
//   );
//   const prevYearCategories = useMemo(
//     () => filterOrdersByDate(categories || [], startOfPrevYear, endOfPrevYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [categories]
//   );
//   const prevYearCategoriesNumber = prevYearCategories.length;
//   const yearCategoriesNumber = yearCategories.length;
//   const yearCategoriesDiff = calculatePercentage(
//     yearCategoriesNumber,
//     prevYearCategoriesNumber
//   );
//   const lifeCategoriesNumber = categories?.length;
//   const getCategoriesFilteredData = () => {
//     switch (selectCategoriesValue) {
//       case "day":
//         return { revenue: todayCategoriesNumber, diff: todayCategoriesDiff };
//       case "week":
//         return { revenue: weekCategoriesNumber, diff: weekCategoriesDiff };
//       case "month":
//         return { revenue: monthCategoriesNumber, diff: monthCategoriesDiff };
//       case "year":
//         return { revenue: yearCategoriesNumber, diff: yearCategoriesDiff };
//       case "life":
//         return { revenue: lifeCategoriesNumber, diff: 100 };
//       default:
//         return { revenue: todayCategoriesNumber, diff: todayCategoriesDiff };
//     }
//   };
//   const filteredCategoriesData = getCategoriesFilteredData();

//   {
//     /* Products */
//   }
//   const todayProducts = useMemo(
//     () => filterOrdersByDate(products || [], startOfToday, endOfToday),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [products]
//   );
//   const todayProductsNumber = todayProducts.length;
//   const prevDayProducts = useMemo(
//     () => filterOrdersByDate(products || [], startOfPrevDay, endOfPrevDay),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [products]
//   );
//   const prevDayProductsNumber = prevDayProducts.length;
//   console.log(prevDayProductsNumber);
//   const todayProductsDiff = calculatePercentage(
//     todayProductsNumber,
//     prevDayProductsNumber
//   );

//   const weekProducts = useMemo(
//     () => filterOrdersByDate(products || [], startOfWeek, endOfWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [products]
//   );
//   const prevWeekProducts = useMemo(
//     () => filterOrdersByDate(products || [], startOfPrevWeek, endOfPrevWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [products]
//   );
//   const weekProductsNumber = weekProducts.length;
//   const prevWeekProductsNumber = prevWeekProducts.length;
//   console.log(weekProductsNumber);
//   console.log(prevWeekProductsNumber);
//   const weekProductsDiff = calculatePercentage(
//     weekProductsNumber,
//     prevWeekProductsNumber
//   );
//   const monthProducts = useMemo(
//     () => filterOrdersByDate(products || [], startOfMonth, endOfMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [products]
//   );
//   const prevMonthProducts = useMemo(
//     () => filterOrdersByDate(products || [], startOfPrevMonth, endOfPrevMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [products]
//   );
//   const monthProductsNumber = monthProducts.length;
//   console.log(monthProductsNumber);
//   const prevMonthProductsNumber = prevMonthProducts.length;
//   console.log(prevMonthProductsNumber);
//   const monthProductsDiff = calculatePercentage(
//     monthProductsNumber,
//     prevMonthProductsNumber
//   );
//   const yearProducts = useMemo(
//     () => filterOrdersByDate(products || [], startOfYear, endOfYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [products]
//   );
//   const prevYearProducts = useMemo(
//     () => filterOrdersByDate(products || [], startOfPrevYear, endOfPrevYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [products]
//   );
//   const prevYearProductsNumber = prevYearProducts.length;
//   const yearProductsNumber = yearProducts.length;
//   const yearProductsDiff = calculatePercentage(
//     yearProductsNumber,
//     prevYearProductsNumber
//   );
//   const lifeProductsNumber = products?.length;
//   const getProductsFilteredData = () => {
//     switch (selectCategoriesValue) {
//       case "day":
//         return { revenue: todayProductsNumber, diff: todayProductsDiff };
//       case "week":
//         return { revenue: weekProductsNumber, diff: weekProductsDiff };
//       case "month":
//         return { revenue: monthProductsNumber, diff: monthProductsDiff };
//       case "year":
//         return { revenue: yearProductsNumber, diff: yearProductsDiff };
//       case "life":
//         return { revenue: lifeProductsNumber, diff: 100 };
//       default:
//         return { revenue: todayProductsNumber, diff: todayProductsDiff };
//     }
//   };
//   const filteredProductsData = getProductsFilteredData();
//   {
//     /* Clients */
//   }
//   const todayClients = useMemo(
//     () => filterOrdersByDate(clients || [], startOfToday, endOfToday),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [clients]
//   );
//   const todayClientsNumber = todayClients.length;
//   const prevDayClients = useMemo(
//     () => filterOrdersByDate(clients || [], startOfPrevDay, endOfPrevDay),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [clients]
//   );
//   const prevDayClientsNumber = prevDayClients.length;
//   console.log(prevDayClientsNumber);
//   const todayClientsDiff = calculatePercentage(
//     todayClientsNumber,
//     prevDayClientsNumber
//   );

//   const weekClients = useMemo(
//     () => filterOrdersByDate(clients || [], startOfWeek, endOfWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [clients]
//   );
//   const prevWeekClients = useMemo(
//     () => filterOrdersByDate(orders || [], startOfPrevWeek, endOfPrevWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [clients]
//   );
//   const weekClientsNumber = weekClients.length;
//   const prevWeekClientsNumber = prevWeekClients.length;
//   console.log(weekClientsNumber);
//   console.log(prevWeekClientsNumber);
//   const weekClientsDiff = calculatePercentage(
//     weekClientsNumber,
//     prevWeekClientsNumber
//   );
//   const monthClients = useMemo(
//     () => filterOrdersByDate(clients || [], startOfMonth, endOfMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [clients]
//   );
//   const prevMonthClients = useMemo(
//     () => filterOrdersByDate(clients || [], startOfPrevMonth, endOfPrevMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [clients]
//   );
//   const monthClientsNumber = monthClients.length;
//   console.log(monthClientsNumber);
//   const prevMonthClientsNumber = prevMonthClients.length;
//   console.log(prevMonthClientsNumber);
//   const monthClientsDiff = calculatePercentage(
//     monthClientsNumber,
//     prevMonthClientsNumber
//   );
//   const yearClients = useMemo(
//     () => filterOrdersByDate(clients || [], startOfYear, endOfYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [clients]
//   );
//   const prevYearClients = useMemo(
//     () => filterOrdersByDate(clients || [], startOfPrevYear, endOfPrevYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [clients]
//   );
//   const prevYearClientsNumber = prevYearClients.length;
//   const yearClientsNumber = yearClients.length;
//   const yearClientsDiff = calculatePercentage(
//     yearClientsNumber,
//     prevYearClientsNumber
//   );
//   const lifeClientsNumber = clients?.length;
//   console.log(lifeClientsNumber);
//   const getClientsFilteredData = () => {
//     switch (selectClientsValue) {
//       case "day":
//         return { revenue: todayClientsNumber, diff: todayClientsDiff };
//       case "week":
//         return { revenue: weekClientsNumber, diff: weekClientsDiff };
//       case "month":
//         return { revenue: monthClientsNumber, diff: monthClientsDiff };
//       case "year":
//         return { revenue: yearClientsNumber, diff: yearClientsDiff };
//       case "life":
//         return { revenue: lifeClientsNumber, diff: 100 };
//       default:
//         return { revenue: todayClientsNumber, diff: todayClientsDiff };
//     }
//   };
//   const filteredClientsData = getClientsFilteredData();

//   {
//     /* Subscriptions */
//   }
//   const todaySubscriptions = useMemo(
//     () => filterOrdersByDate(subscriptions || [], startOfToday, endOfToday),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [subscriptions]
//   );
//   const todaySubscriptionsNumber = todaySubscriptions.length;
//   const prevDaySubscriptions = useMemo(
//     () => filterOrdersByDate(subscriptions || [], startOfPrevDay, endOfPrevDay),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [subscriptions]
//   );
//   const prevDaySubscriptionsNumber = prevDaySubscriptions.length;
//   console.log(prevDaySubscriptionsNumber);
//   const todaySubscriptionsDiff = calculatePercentage(
//     todaySubscriptionsNumber,
//     prevDaySubscriptionsNumber
//   );

//   const weekSubscriptions = useMemo(
//     () => filterOrdersByDate(subscriptions || [], startOfWeek, endOfWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [subscriptions]
//   );
//   const prevWeekSubscriptions = useMemo(
//     () => filterOrdersByDate(orders || [], startOfPrevWeek, endOfPrevWeek),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [subscriptions]
//   );
//   const weekSubscriptionsNumber = weekSubscriptions.length;
//   const prevWeekSubscriptionsNumber = prevWeekSubscriptions.length;
//   console.log(weekSubscriptionsNumber);
//   console.log(prevWeekSubscriptionsNumber);
//   const weekSubscriptionsDiff = calculatePercentage(
//     weekSubscriptionsNumber,
//     prevWeekSubscriptionsNumber
//   );
//   const monthSubscriptions = useMemo(
//     () => filterOrdersByDate(subscriptions || [], startOfMonth, endOfMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [subscriptions]
//   );
//   const prevMonthSubscriptions = useMemo(
//     () =>
//       filterOrdersByDate(subscriptions || [], startOfPrevMonth, endOfPrevMonth),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [subscriptions]
//   );
//   const monthSubscriptionsNumber = monthSubscriptions.length;
//   console.log(monthSubscriptionsNumber);
//   const prevMonthSubscriptionsNumber = prevMonthSubscriptions.length;
//   console.log(prevMonthSubscriptionsNumber);
//   const monthSubscriptionsDiff = calculatePercentage(
//     monthSubscriptionsNumber,
//     prevMonthSubscriptionsNumber
//   );
//   const yearSubscriptions = useMemo(
//     () => filterOrdersByDate(subscriptions || [], startOfYear, endOfYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [subscriptions]
//   );
//   const prevYearSubscriptions = useMemo(
//     () =>
//       filterOrdersByDate(subscriptions || [], startOfPrevYear, endOfPrevYear),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [subscriptions]
//   );
//   const prevYearSubscriptionsNumber = prevYearSubscriptions.length;
//   const yearSubscriptionsNumber = yearSubscriptions.length;
//   const yearSubscriptionsDiff = calculatePercentage(
//     yearSubscriptionsNumber,
//     prevYearSubscriptionsNumber
//   );
//   const lifeSubscriptionsNumber = subscriptions?.length;
//   console.log(lifeSubscriptionsNumber);
//   const getSubscriptionsFilteredData = () => {
//     switch (selectSubscriptionsValue) {
//       case "day":
//         return {
//           revenue: todaySubscriptionsNumber,
//           diff: todaySubscriptionsDiff,
//         };
//       case "week":
//         return {
//           revenue: weekSubscriptionsNumber,
//           diff: weekSubscriptionsDiff,
//         };
//       case "month":
//         return {
//           revenue: monthSubscriptionsNumber,
//           diff: monthSubscriptionsDiff,
//         };
//       case "year":
//         return {
//           revenue: yearSubscriptionsNumber,
//           diff: yearSubscriptionsDiff,
//         };
//       case "life":
//         return { revenue: lifeSubscriptionsNumber, diff: 100 };
//       default:
//         return {
//           revenue: todaySubscriptionsNumber,
//           diff: todaySubscriptionsDiff,
//         };
//     }
//   };
//   const filteredSubscriptionsData = getSubscriptionsFilteredData();
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
//       <OverViewCardItem
//         title="Revenue"
//         value={`${filteredData.revenue?.toFixed(3)} dt`}
//         isValueFetching={isOrdersFetching}
//         pourcentage={`${filteredData.diff.toFixed(1)}%`}
//         diff={filteredData.diff}
//         selectValue={selectValue}
//         handleSelectChange={handleSelectChange}
//         info={`La variation se fait par rapport au ${selectValue}`}
//       />
//       <OverViewCardItem
//         title="Commandes"
//         value={`${filteredCommandData.revenue}`}
//         isValueFetching={isOrdersFetching}
//         pourcentage={`${filteredCommandData.diff.toFixed(1)}%`}
//         diff={filteredCommandData.diff}
//         selectValue={selectCommandValue}
//         handleSelectChange={handleCommandSelectChange}
//         info={`La variation se fait par rapport au ${selectCommandValue}`}
//       />
//       <OverViewCardItem
//         title="Categories"
//         value={`${filteredCategoriesData.revenue} / ${filteredProductsData.revenue}`}
//         pourcentage={`${filteredCategoriesData.diff.toFixed(1)}%`}
//         diff={filteredCategoriesData.diff}
//         selectValue={selectCategoriesValue}
//         handleSelectChange={handleCategoriesSelectChange}
//         isValueFetching={isCategoriesFetching || isProductsFetching}
//         info={`La variation se fait par rapport au ${selectCategoriesValue}`}
//       />
//       <OverViewCardItem
//         title="Clients"
//         value={`${filteredClientsData.revenue}`}
//         pourcentage={`${filteredClientsData.diff.toFixed(1)}%`}
//         diff={filteredClientsData.diff}
//         selectValue={selectClientsValue}
//         handleSelectChange={handleClientsSelectChange}
//         isValueFetching={isClientsFetching}
//         info={`La variation se fait par rapport au ${selectClientsValue}`}
//       />
//       <OverViewCardItem
//         title="Subscriptions"
//         value={`${filteredSubscriptionsData.revenue}`}
//         pourcentage={`${filteredSubscriptionsData.diff.toFixed(1)}%`}
//         diff={filteredSubscriptionsData.diff}
//         selectValue={selectSubscriptionsValue}
//         handleSelectChange={handleSubscriptionsSelectChange}
//         isValueFetching={isSubscriptionsFetching}
//         info={`La variation se fait par rapport au ${selectSubscriptionsValue}`}
//       />
//     </div>
//   );
// };

// export default OverViewCards;
