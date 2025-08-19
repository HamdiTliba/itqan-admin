/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useTransition } from "react";
import Home from "../svgs/Home";
import Subscription from "../svgs/Subscription";
import Users from "../svgs/Users";
import MessageCirclePlus from "../svgs/MessageCirclePlus";
import Application from "../svgs/Application";
import Pages from "../svgs/Pages";
import Categories from "../svgs/Categories";
import Orders from "../svgs/Orders";
import Chart from "../svgs/Chart";
import Shirt from "../svgs/Shirt";
import Chevron from "../svgs/Chevron";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BriefCase from "../svgs/BriefCase";
import HandShake from "../svgs/handShake";
import Admins from "../svgs/Admins";
import Cart from "../svgs/Cart";

export const sectionPaths = [
  {
    section: "Boutique",
    pages: [
      // { page: "OverView", icon: <Home />, href: "/" },

      // {
      //   page: "Au Panier",
      //   icon: <Cart />,
      //   href: "cart",
      //   subPages: [],
      // },
      {
        page: "Orders",
        icon: <Orders />,
        href: "orders",
        subPages: [],
      },
      // { page: "Categories", icon: <Categories />, href: "categories" },
      { page: "Produits", icon: <Shirt />, href: "products" },
    ],
  },
  // {
  //   section: "Finances",
  //   pages: [
  //     // {
  //     //   page: "Achat",
  //     //   icon: <BriefCase strokeColor="darkMagenta" />,
  //     //   href: "achat",
  //     //   subPages: [
  //     //     { subPage: "Bon de commande", href: "bon-de-commande" },
  //     //     { subPage: "Bon de réception", href: "bon-de-reception" },
  //     //     { subPage: "Facture Fournisseur", href: "facture-fournisseur" },
  //     //     { subPage: "Retenue à la source ", href: "retenue-source" },
  //     //     { subPage: "Paiements ", href: "payments" },
  //     //   ],
  //     // },
  //     {
  //       page: "Vente",
  //       icon: <BriefCase strokeColor="darkGreen" />,
  //       href: "vente/commande-client",
  //       subPages: [
  //         // { subPage: "Devis", href: "devis" },
  //         { subPage: "Commande client", href: "vente/commande-client" },
  //         { subPage: "Bon de livraison", href: "vente/bon-de-livraison" },
  //         { subPage: "Commande reçue", href: "vente/commande-recue" },
  //         { subPage: "Facture", href: "vente/facture" },
  //         // { subPage: "Bon d'achat", href: "bon-de-achat" },
  //         { subPage: "Paiements ", href: "vente/payments" },
  //       ],
  //     },
  //     {
  //       page: "Bilan",
  //       icon: <HandShake />,
  //       href: "bilan/bilan-actif",
  //       subPages: [
  //         { subPage: "Bilan actif", href: "bilan/bilan-actif" },
  //         { subPage: "Bilan passif", href: "bilan/bilan-passif" },
  //         { subPage: "Résultat", href: "bilan/result" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   section: "Relation",
  //   pages: [
  //     { page: "Clients", icon: <Users />, href: "clients" },
  //     { page: "Contacts", icon: <MessageCirclePlus />, href: "contacts" },
  //     { page: "Subscriptions", icon: <Subscription />, href: "subscriptions" },
  //   ],
  // },
  // {
  //   section: "Apps",
  //   pages: [
  //     { page: "Applications", icon: <Application />, href: "applications" },
  //     // { page: "Analytics", icon: <Chart />, href: "analytics" },
  //   ],
  // },
  {
    section: "Administration",
    pages: [{ page: "Admins", icon: <Admins />, href: "admins" }],
  },
];

const Sidebar = () => {
  const [isExpandedMenu, setIsExpandedMenu] = useState(false);
  const [isChevronActive, setIsChevronActive] = useState<{
    section: string;
    index: number;
  } | null>(null);
  const [isMenuHover, setIsMenuHover] = useState(false);
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  // useEffect(() => {
  //   const handleResize = () => {
  //     const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  //     setIsExpandedMenu(isDesktop);
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const handleChevronToggle = (section: string, index: number) => {
    console.log("Chevron toggled:", index);
    console.log("Section:", section);

    startTransition(() => {
      setIsChevronActive((prev) =>
        prev && prev.section === section && prev.index === index
          ? null
          : { section, index }
      );
    });
  };
  console.log("pathname:", pathname);
  const toggleMenu = () => {
    startTransition(() => {
      setIsExpandedMenu(!isExpandedMenu);
    });
  };
  return (
    <div
      className={`fixed max-w-[1366px] m-auto lg:max-h-[768px] flex flex-col justify-center  h-full   transition-all duration-500 ease-in-out z-50 
    ${isMenuHover ? "opacity-100" : "lg:opacity-25"}
       ${isExpandedMenu ? "w-44" : "w-10 lg:w-12 opacity-50"}`}>
      <div
        className="block lg:hidden absolute w-2 h-20 bg-black dark:bg-neutral-400 rounded-full -right-1 top-[45%] transform cursor-pointer"
        onClick={toggleMenu}
      />

      <div
        className={`overflow-y-auto hide-scrollbar directionRtl bg-neutral-50 dark:bg-neutral-800 rounded-r-lg border border-neutral-300 border-l-transparent dark:border-neutral-600 dark:border-l-transparent py-2
        stillShadow
        
        `}>
        <div
          className="flex flex-col justify-center  gap-1 md:px-1  directionLtr "
          onPointerEnter={() => {
            setIsMenuHover(true);

            setIsExpandedMenu(true);
          }}
          onPointerLeave={() => {
            setIsMenuHover(false);
            // if (window.innerWidth > 1024) {
            //   setIsExpandedMenu(false);
            // }
          }}
          onMouseLeave={() => setIsExpandedMenu(false)}>
          {sectionPaths.map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex flex-col gap-1 select-none">
              {/* Section Title */}
              {isExpandedMenu && (
                <div className="font-medium text-center px-1 mt-1">
                  {sectionIndex > 0 && (
                    <hr className="h-1 border-neutral-200 dark:border-neutral-600" />
                  )}
                  {section.section}
                </div>
              )}

              {/* Section Pages */}
              {section.pages.map((item, index) => (
                <div
                  key={index}
                  className={`border-[1px] text-sm flex flex-col justify-center items-start select-none w-full transition-[max-width]  duration-150 ease-in-out font-medium  ${
                    isExpandedMenu ? "max-w-[500px] w-full" : "max-w-[34px]"
                  }
                 
                  ${
                    pathname.startsWith(`/admin/${item.href}`) ||
                    (pathname === "/admin" && item.page === "OverView")
                      ? "bg-white text-black  border-neutral-300 rounded-xl"
                      : "!font-extralight border-transparent"
                  }

                  
                `}>
                  <Link
                    href={`/admin/${item.href}`}
                    className="flex justify-between items-center w-full p-1 text-left rounded-md">
                    <div
                      className={`flex  items-center ${
                        isExpandedMenu && "gap-2"
                      }`}>
                      {item.icon}
                      {isExpandedMenu && (
                        <span
                          className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out `}>
                          {item.page}
                        </span>
                      )}
                    </div>
                    {isExpandedMenu &&
                      item.subPages &&
                      item.subPages?.length > 0 && (
                        <Chevron
                          className={`${
                            isExpandedMenu ? "block" : "hidden"
                          } w-5 h-5 transition-transform ${
                            isChevronActive?.index === index &&
                            isChevronActive.section === section.section
                              ? "rotate-180"
                              : ""
                          }`}
                          onClick={() =>
                            handleChevronToggle(section.section, index)
                          }
                        />
                      )}
                  </Link>

                  {/* SubPages */}
                  {/* {isExpandedMenu &&
                    item.subPages &&
                    item.subPages?.length > 0 && (
                      <div
                        className={`flex flex-col overflow-hidden`}
                        style={{
                          maxHeight:
                            isChevronActive?.index === index &&
                            isChevronActive.section === section.section
                              ? `${item.subPages.length * 2.5}rem`
                              : "0",
                          transition: "max-height 400ms ease-in-out",
                        }}>
                        {item.subPages.map((subLink, subIndex) => {
                          return (
                            subLink && (
                              <Link
                                key={subIndex}
                                href={`/admin/${subLink.href}`}
                                className={`pl-3 pr-1 text-xs leading-4 py-[2px] transition-all ${
                                  pathname ===
                                  `/admin/${item.href}/${subLink.href}`
                                    ? "font-medium"
                                    : "font-light"
                                }
                        `}
                                // onClick={() =>
                                //   handleChevronToggle(section.section, index)
                                // }
                              >
                                - {subLink.subPage}
                              </Link>
                            )
                          );
                        })}
                      </div>
                    )} */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
