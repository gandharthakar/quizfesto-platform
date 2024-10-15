'use client';

import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import { IoMdCheckmark } from "react-icons/io";
import AdminSearchPanel from "@/app/components/admin/adminSearchPanel";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import SitePagination from "@/app/components/sitePagination";
// import { dump_list_of_users } from "@/app/constant/datafaker";
import AdminListUsersCard from "@/app/components/admin/adminListUsersCard";
import { FaEllipsisVertical } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";

interface QF_User {
    user_id: string,
    user_name: string,
    user_role: string,
    user_block_status: string
}

function GFG(array: any, currPage: number, pageSize: number) {
    const startIndex = (currPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

function Page() {

    const dataPerPage = 10;
    const [srchInp, setSrchInp] = useState<string>("");

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [userData, setUserData] = useState<QF_User[]>([]);
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(userData.length / dataPerPage));
    const [userList, setUserList] = useState<QF_User[]>([]);
    // const totalPages = Math.ceil(totalItems / dataPerPage);

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleSearchInputChange = (e: any) => {
        setSrchInp(e.target.value);
        if (srchInp.length === 1) {
            setCurrentPage(1);
            setUserList(GFG(userData, currentPage, dataPerPage));
            setTotalPages(Math.ceil(userData.length / dataPerPage));
        }
    }

    const handleSearchInputKeyDown = (e: any) => {
        setSrchInp(e.target.value);
        if (e.key === "Backspace") {
            setCurrentPage(1);
            setUserList(GFG(userData, currentPage, dataPerPage));
            setTotalPages(Math.ceil(userData.length / dataPerPage));
        }
    }

    const ust = (trm: string) => {
        let text = '';
        if (trm == "true") {
            text = "Blocked"
        } else {
            text = "Unblocked"
        }
        return text;
    }

    const handleSearchLogic = (e: any) => {
        e.preventDefault();
        if (srchInp == '') {
            Swal.fire({
                title: "Error!",
                text: "Please enter search term first.",
                icon: "error",
                timer: 4000
            });
        } else {

            if (userList.length > 0) {
                const res = userData.filter((item) => {
                    const srch_res = item.user_name.toLowerCase().includes(srchInp.toLowerCase()) || item.user_role.toLowerCase().includes(srchInp.toLowerCase()) || ust(item.user_block_status).toLowerCase().includes(srchInp.toLowerCase());
                    return srch_res;
                });

                if (res.length > 0) {
                    setCurrentPage(1);
                    setTotalPages(Math.ceil(res.length / dataPerPage));
                    setUserList(GFG(res, currentPage, dataPerPage));
                    if (srchInp == "") {
                        setCurrentPage(1);
                        setTotalPages(Math.ceil(userData.length / dataPerPage));
                        setUserList([]);
                    }
                } else {
                    if (srchInp == "") {
                        setCurrentPage(1);
                        setTotalPages(Math.ceil(userData.length / dataPerPage));
                        setUserList([]);
                    }
                    setCurrentPage(1);
                    setUserList(GFG(res, currentPage, dataPerPage));
                    setTotalPages(Math.ceil(res.length / dataPerPage));
                }
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "No Quizes Found.",
                    icon: "error",
                    timer: 4000
                });
            }
        }
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setUserList(GFG(userData, newPage, dataPerPage));
        setSelectAll(false);
        setSelectedItems([]);
    };

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        const allIds = userList.map(item => item['user_id']);
        setSelectedItems(selectAll ? [] : allIds);
    };

    const toggleItem = (itemId: string) => {
        const index = selectedItems.indexOf(itemId);
        if (index === -1) {
            setSelectedItems([...selectedItems, itemId]);
        } else {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        }
    };

    const handleCheckboxChange = (itemId: string) => {
        toggleItem(itemId);
    };

    // const handleResetDataChange = () => {
    //     setIsMenuOpen(false);
    // }

    const handleRDSelectedBulkLogic = async () => {
        if (selectedItems.length > 0) {
            const conf = confirm("Are you sure want to reset participation data for selected users ?");
            if (conf) {
                const baseURI = window.location.origin;
                const resp = await fetch(`${baseURI}/api/admin/users/participation-data/delete-selected`, {
                    method: "DELETE",
                    body: JSON.stringify({ user_id_list: selectedItems }),
                });
                const body = await resp.json();
                if (body.success) {
                    Swal.fire({
                        title: "Success!",
                        text: body.message,
                        icon: "success",
                        timer: 3000
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: body.message,
                        icon: "error",
                        timer: 3000
                    });
                }
            }
        } else {
            Swal.fire({
                title: "Error!",
                text: "Please Select Users First!",
                icon: "error",
                timer: 3000
            });
        }
        setIsMenuOpen(false);
    }

    const handleRDAllBulkLogic = async () => {
        const conf = confirm("Are you sure want to reset participation data for all users ?");
        if (conf) {
            const baseURI = window.location.origin;
            const resp = await fetch(`${baseURI}/api/admin/users/participation-data/delete-all`, {
                method: "DELETE",
            });
            const body = await resp.json();
            if (body.success) {
                Swal.fire({
                    title: "Success!",
                    text: body.message,
                    icon: "success",
                    timer: 3000
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: body.message,
                    icon: "error",
                    timer: 3000
                });
            }
        }
        setIsMenuOpen(false);
    }

    const handleDeleteSelectedBulkLogic = async () => {
        if (selectedItems.length > 0) {
            const conf = confirm("Are you sure want to delete selected users ?");
            if (conf) {
                const baseURI = window.location.origin;
                const resp = await fetch(`${baseURI}/api/admin/users/bulk-actions/delete-selected`, {
                    method: "DELETE",
                    body: JSON.stringify({ user_id_list: selectedItems })
                });
                const body = await resp.json();
                if (body.success) {
                    Swal.fire({
                        title: "Success!",
                        text: body.message,
                        icon: "success",
                        timer: 2000
                    });
                    const set = setTimeout(() => {
                        window.location.reload();
                        clearTimeout(set);
                    }, 2000);
                }
            }
        } else {
            Swal.fire({
                title: "Error!",
                text: "Please Select Users First!",
                icon: "error",
                timer: 3000
            });
        }
        setIsMenuOpen(false);
    }

    const handleDeleteAllBulkLogic = async () => {
        const conf = confirm("Are you sure want to delete all users ?");
        if (conf) {
            const baseURI = window.location.origin;
            const resp = await fetch(`${baseURI}/api/admin/users/bulk-actions/delete-all`, {
                method: "DELETE",
            });
            const body = await resp.json();
            if (body.success) {
                Swal.fire({
                    title: "Success!",
                    text: body.message,
                    icon: "success",
                    timer: 2000
                });
                const set = setTimeout(() => {
                    window.location.reload();
                    clearTimeout(set);
                }, 2000);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: body.message,
                    icon: "error",
                    timer: 2000
                });
            }
        }
        setIsMenuOpen(false);
    }

    // useEffect(() => {
    //     setUserList(GFG(dump_list_of_users, currentPage, dataPerPage));
    // //eslint-disable-next-line
    // }, []);

    useEffect(() => {
        if (selectedItems.length === userList.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedItems, userList]);

    useEffect(() => {

        const menuHandler = (e: any) => {
            if (menuRef.current !== null) {
                if (!menuRef.current.contains(e.target)) {
                    setIsMenuOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', menuHandler);
        //eslint-disable-next-line
    }, []);

    const getUserData = async () => {
        const baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/admin/users/bulk-actions/read-all`, {
            method: "GET",
            cache: 'no-store',
            next: { revalidate: 60 }
        });
        const body = await resp.json();
        if (body.success) {
            setIsLoading(false);
            setUserList(GFG(body.users, currentPage, dataPerPage));
            setUserData(body.users);
            setTotalPages(Math.ceil(body.users.length / dataPerPage));
        } else {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUserData();
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="py-[25px]">
                <div className="pb-[25px]">
                    <div className="flex gap-x-[15px] gap-y-[10px] flex-wrap items-center">
                        <div className="mr-auto">
                            <Link
                                href="/admin/users/create-new-user"
                                title="Add New"
                                className="transition-all delay-75 inline-block font-noto_sans font-semibold text-[14px] md:text-[16px] py-[8px] md:py-[10px] px-[10px] md:px-[15px] bg-theme-color-2 text-zinc-100 hover:bg-theme-color-2-hover-dark"
                            >
                                <div className="flex gap-x-[5px] items-center">
                                    <GrAdd size={20} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
                                    <div className="hidden md:block">Add New</div>
                                </div>
                            </Link>
                        </div>
                        <div className="pr-[5px]">
                            <form onSubmit={handleSearchLogic}>
                                <AdminSearchPanel
                                    sarchInputVal={srchInp}
                                    searchInputChange={handleSearchInputChange}
                                    searchInputKeyDown={handleSearchInputKeyDown}
                                />
                            </form>
                        </div>
                        <div className="alqc-chrb">
                            <input
                                type="checkbox"
                                id="selall"
                                // name="all_quiz" 
                                className="input-chrb"
                                checked={selectAll} onChange={toggleSelectAll}
                            />
                            <label htmlFor="selall" className="label">
                                <div>
                                    <div className="squere-box">
                                        <IoMdCheckmark size={18} className="svg-icon" />
                                    </div>
                                </div>
                                <div className="label-text">
                                    Select All
                                </div>
                            </label>
                        </div>
                        {/* <button 
                            type="button" 
                            title="Delete All" 
                            className="transition-all delay-75 inline-block font-noto_sans font-semibold text-[14px] md:text-[16px] py-[8px] md:py-[10px] px-[10px] md:px-[15px] bg-red-600 text-zinc-100 hover:bg-red-700" 
                            onClick={handleDeleteBulkLogic} 
                        >
                            <div className="flex gap-x-[5px] items-center">
                                <RiDeleteBin6Line size={20} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
                                <div className="hidden md:block">Delete All</div>
                            </div>
                        </button> */}
                        <div ref={menuRef} className="relative h-[18px]">
                            <button
                                type="button"
                                title="Actions"
                                className="transition-all delay-75 text-zinc-800 dark:text-zinc-200"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <FaEllipsisVertical size={18} />
                            </button>
                            <ul className={`absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-950 dark:ring-zinc-800 ${isMenuOpen ? 'block' : 'hidden'}`}>
                                <li className="w-full">
                                    <button
                                        type="button"
                                        title="Reset Selected Data"
                                        className="transition-all delay-75 block w-full py-[10px] px-[15px] font-ubuntu text-[16px] text-zinc-900 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                        onClick={handleRDSelectedBulkLogic}
                                    >
                                        <div className="flex gap-x-[5px] items-center">
                                            <GrPowerReset size={20} />
                                            <div>
                                                Reset Selected Data
                                            </div>
                                        </div>
                                    </button>
                                </li>
                                <li className="w-full">
                                    <button
                                        type="button"
                                        title="Reset All Data"
                                        className="transition-all delay-75 block w-full py-[10px] px-[15px] font-ubuntu text-[16px] text-zinc-900 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                        onClick={handleRDAllBulkLogic}
                                    >
                                        <div className="flex gap-x-[5px] items-center">
                                            <GrPowerReset size={20} />
                                            <div>
                                                Reset All Data
                                            </div>
                                        </div>
                                    </button>
                                </li>
                                <li className="w-full">
                                    <button
                                        type="button"
                                        title="Delete All"
                                        className="transition-all delay-75 block w-full py-[10px] px-[15px] font-ubuntu text-[16px] text-red-500 hover:bg-zinc-100 dark:text-red-500 dark:hover:bg-zinc-800"
                                        onClick={handleDeleteSelectedBulkLogic}
                                    >
                                        <div className="flex gap-x-[5px] items-center">
                                            <RiDeleteBin6Line size={20} />
                                            <div>
                                                Delete Selected
                                            </div>
                                        </div>
                                    </button>
                                </li>
                                <li className="w-full">
                                    <button
                                        type="button"
                                        title="Delete All"
                                        className="transition-all delay-75 block w-full py-[10px] px-[15px] font-ubuntu text-[16px] text-red-500 hover:bg-zinc-100 dark:text-red-500 dark:hover:bg-zinc-800"
                                        onClick={handleDeleteAllBulkLogic}
                                    >
                                        <div className="flex gap-x-[5px] items-center">
                                            <RiDeleteBin6Line size={20} />
                                            <div>
                                                Delete All
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    {
                        userList?.length ?
                            (
                                <>
                                    {
                                        userList.map((itm: any) => (
                                            <div key={itm.user_id} className="pb-[20px] last:pb-0">
                                                <AdminListUsersCard
                                                    user_id={itm.user_id}
                                                    user_name={itm.user_name}
                                                    user_role={itm.user_role}
                                                    user_block_status={itm.user_block_status}
                                                    checkboxName={"user_list"}
                                                    checkboxValue={itm.user_id}
                                                    checkboxChecked={selectedItems.includes(itm.user_id)}
                                                    onCheckboxChange={handleCheckboxChange}
                                                />
                                            </div>
                                        ))
                                    }
                                </>
                            )
                            :
                            (
                                <>
                                    {
                                        isLoading ?
                                            (<div className="spinner size-1"></div>)
                                            :
                                            (
                                                <h1 className="transition-all delay-75 text-[16px] md:text-[18px] font-semibold text-zinc-800 dark:text-zinc-300">
                                                    No Users Found.
                                                </h1>
                                            )
                                    }
                                </>
                            )
                    }
                </div>

                <SitePagination
                    totalPages={totalPages}
                    dataPerPage={dataPerPage}
                    currentPage={currentPage}
                    parentClassList="pt-[50px]"
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default Page;