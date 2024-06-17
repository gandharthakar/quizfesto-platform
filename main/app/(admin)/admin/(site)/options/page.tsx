'use client';

import AdminListQuestionOption from "@/app/components/admin/adminListQuestionOption";
import AdminSearchPanel from "@/app/components/admin/adminSearchPanel";
import SitePagination from "@/app/components/sitePagination";
import { dump_list_of_options } from "@/app/constant/datafaker";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { IoMdCheckmark } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

function GFG(array: any, currPage: number, pageSize: number) {
    const startIndex = (currPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

function page() {

    const dataPerPage = 5;
    const [srchInp, setSrchInp] = useState<string>("");
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(dump_list_of_options.length / dataPerPage));
    const [optionsListData, setOptionsListData] = useState([]);

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSearchInputChange = (e:any) => {
        setSrchInp(e.target.value);
        if(srchInp.length === 1) {
            setCurrentPage(1);
            setOptionsListData(GFG(dump_list_of_options, currentPage, dataPerPage));
            setTotalPages(Math.ceil(dump_list_of_options.length / dataPerPage));
        }
    }

    const handleSearchInputKeyDown = (e:any) => {
        setSrchInp(e.target.value);
        if(e.key === "Backspace") {
            setCurrentPage(1);
            setOptionsListData(GFG(dump_list_of_options, currentPage, dataPerPage));
            setTotalPages(Math.ceil(dump_list_of_options.length / dataPerPage));
        }
    }

    const handleSearchLogic = (e: any) => {
        e.preventDefault();
        if(srchInp == '') {
            Swal.fire({
                title: "Error!",
                text: "Please enter search term first.",
                icon: "error",
                timer: 4000
            });
        }

        if(optionsListData.length > 0) {

            const res = dump_list_of_options.filter((item) => {
                const srch_res = item.question_text.toLowerCase().includes(srchInp.toLowerCase()) || item.search_tems.toString().toLowerCase().includes(srchInp.toLowerCase());
                return srch_res;
            });

            if(res.length > 0) {
                setCurrentPage(1);
                setTotalPages(Math.ceil(res.length / dataPerPage));
                setOptionsListData(GFG(res, currentPage, dataPerPage));
                if(srchInp == "") {
                    setCurrentPage(1);
                    setTotalPages(Math.ceil(dump_list_of_options.length / dataPerPage));
                    setOptionsListData([]);
                }
            } else {
                if(srchInp == "") {
                    setCurrentPage(1);
                    setTotalPages(Math.ceil(dump_list_of_options.length / dataPerPage));
                    setOptionsListData([]);
                }
                setCurrentPage(1);
                setOptionsListData(GFG(res, currentPage, dataPerPage));
                setTotalPages(Math.ceil(res.length / dataPerPage));
            }
        } else {
            Swal.fire({
                title: "Error!",
                text: "No Options Found.",
                icon: "error",
                timer: 4000
            });
        }
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setOptionsListData(GFG(dump_list_of_options, newPage, dataPerPage));
        setSelectAll(false);
        setSelectedItems([]);
    };

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        const allIds = optionsListData.map(item => item['options_id']);
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

    const handleDeleteBulkLogic = () => {
        console.log(selectedItems);
        if(selectedItems.length > 0) {
            Swal.fire({
                title: "Success!",
                text: "Selected Quizes Deleted Successfully!",
                icon: "success",
                timer: 4000
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "Please Select Quiz Items First!",
                icon: "error",
                timer: 4000
            });
        }
    }

    useEffect(() => {
        setOptionsListData(GFG(dump_list_of_options, currentPage, dataPerPage));
    }, []);

    useEffect(() => {
        if (selectedItems.length === optionsListData.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedItems, optionsListData]);

    return (
        <>
            <div className="py-[25px]">
                <div className="pb-[25px]">
                    <div className="flex gap-x-[15px] gap-y-[10px] flex-wrap items-center">
                        <div className="mr-auto">
                            <Link 
                                href="/admin/options/create-new-options" 
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
                        <button 
                            type="button" 
                            title="Delete All" 
                            className="transition-all delay-75 inline-block font-noto_sans font-semibold text-[14px] md:text-[16px] py-[8px] md:py-[10px] px-[10px] md:px-[15px] bg-red-600 text-zinc-100 hover:bg-red-700" 
                            onClick={handleDeleteBulkLogic} 
                        >
                            <div className="flex gap-x-[5px] items-center">
                                <RiDeleteBin6Line size={20} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
                                <div className="hidden md:block">Delete All</div>
                            </div>
                        </button>
                    </div>
                </div>

                <div>
                    {
                        optionsListData.length ? 
                        (
                            <>
                                {
                                    optionsListData.map((itm: any) => (
                                        <div key={itm.options_id} className="pb-[20px] last:pb-0">
                                            <AdminListQuestionOption 
                                                options_id={itm.options_id} 
                                                question_id={itm.question_id} 
                                                options_data={itm.options_data} 
                                                question_text={itm.question_text} 
                                                checkboxName={"options_list"} 
                                                checkboxValue={itm.options_id} 
                                                checkboxChecked={selectedItems.includes(itm.options_id)} 
                                                onCheckboxChange={handleCheckboxChange} 
                                            />
                                        </div>
                                    ))
                                }
                            </>
                        ) 
                        : 
                        ("")
                    }
                    {/* <div className="pb-[20px] last:pb-0">
                        <AdminListQuestionOption 
                            options_id="123" 
                            options_data={[
                                {
                                    option_id: "1",
                                    option_text: "Option 1", 
                                    correct_answer: true
                                },
                                {
                                    option_id: "2",
                                    option_text: "Option 2", 
                                    correct_answer: false
                                },
                                {
                                    option_id: "3",
                                    option_text: "Option 3", 
                                    correct_answer: false
                                },
                                {
                                    option_id: "4",
                                    option_text: "Option 4", 
                                    correct_answer: false
                                },
                            ]} 
                            question_id="52" 
                        />
                    </div>
                    <div className="pb-[20px] last:pb-0">
                        <AdminListQuestionOption 
                            options_id="321" 
                            options_data={[
                                {
                                    option_id: "11",
                                    option_text: "Option 11", 
                                    correct_answer: false
                                },
                                {
                                    option_id: "12",
                                    option_text: "Option 12", 
                                    correct_answer: false
                                },
                                {
                                    option_id: "13",
                                    option_text: "Option 13", 
                                    correct_answer: false
                                },
                                {
                                    option_id: "14",
                                    option_text: "Option 14", 
                                    correct_answer: true
                                },
                            ]} 
                            question_id="62" 
                        />
                    </div> */}
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

export default page;