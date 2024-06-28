'use client';

import Image from "next/image";
import { useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import Swal from "sweetalert2";

interface WinPriFrm {
    prize_type_text: string | number,
    prize_possition_text: string,
}

function WinnerPrizeForm(props: WinPriFrm) {

    let { prize_type_text, prize_possition_text } = props;

    const defaultImage = "https://placehold.co/1000x700/png";

    const [profileImage, setProfileImage] = useState<string>("");
    const [imageFile, setImageFile] = useState<string>('');
    const [fileExt, setFileExt] = useState<string>('');
    const [imageFileSize, setImageFileSize] = useState<boolean>(false);
    const [imageDimensions, setImageDimensions] = useState<boolean>(false);
    const [descr, setDescr] = useState<string>("");
    const [descError, setDescError] = useState<string>("");

    const handleImageFileInput = async (e: any) => {
        let file = e.target.files[0];
        if(!file) {
            setImageFile('');
            return;
        } else {
            let gfnext = file.name;
            let fext = gfnext.split('.').pop();
            setFileExt(fext);
            setProfileImage(URL.createObjectURL(file));
        
            if (file.size > 500 * 1024) {
                setImageFileSize(false);
            } else {
                setImageFileSize(true);
            }

            const img = document.createElement('img');
            const objectURL = URL.createObjectURL(file);
            img.src = objectURL;
            img.onload = function handleLoad() {
                let {width, height} = img;
                if(width == 700 && height == 500) {
                    setImageDimensions(true);
                } else {
                    setImageDimensions(false);
                }
                URL.revokeObjectURL(objectURL);
            }
        }

        const base64 = await convertBase64(file);
        setImageFile(base64);
    }

    const removeButtonClick = () => {
        setProfileImage("");
        setImageFile("");
        setFileExt("");
        setImageFileSize(false);
        setImageDimensions(false);
    }

    const convertBase64 = (file:any) => {
        return new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                typeof fileReader.result === "string" ?
                resolve(fileReader.result)
                : reject("Unexpected type received from FileReader");
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleChangeDscr = (e: any) => {
        let value = e.target.value;
        setDescr(value);
        if(value == '') {
            setDescError("Please enter some value.");
        } else {
            setDescError("");
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        let validPrizeCoverPhoto:boolean = false;

        if(descr == '') {
            setDescError("Please enter some value.");
        } else {
            setDescError("");
        }

        // Get file extention.
        const allowedFileTypes = ["jpg", "png", "jpeg"];

        // console.log(imageFile);
        if(imageFile == '') {
            Swal.fire({
                title: "Error!",
                text: "Please select a photo.",
                icon: "error",
                timer: 4000
            });
        } else {
            if(!allowedFileTypes.includes(fileExt)) {
                Swal.fire({
                    title: "Error!",
                    text: "Only .jpg, .jpeg and .png files are allowed.",
                    icon: "error",
                    timer: 4000
                });
            } else {
                if(!imageFileSize) {
                    Swal.fire({
                        title: "Error!",
                        text: "Image file size is bigger than 500 kb.",
                        icon: "error",
                        timer: 4000
                    });
                } else {
                    if(!imageDimensions) {
                        Swal.fire({
                            title: "Error!",
                            text: "Image dimensions is expected 700px x 500px. (rectangular size)",
                            icon: "error",
                            timer: 4000
                        });
                    } else {
                        validPrizeCoverPhoto = true;
                    }
                }
            }
        }

        if(validPrizeCoverPhoto && descr) {
            const data = {
                prize_type: prize_type_text,
                prize_photo: imageFile,
                prize_description: descr,
            }
            console.log(data);
        }
    }

    return (
        <>
            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] border-zinc-300 bg-white hover:border-zinc-600 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-400">
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-x-[20px] gap-y-[10px] items-start md:items-start flex-col md:flex-row">
                        <div className="w-full md:max-w-[200px]">
                            <div className="relative">
                                <div className="flex items-center justify-center gap-[20px] h-full w-full absolute left-0 top-0 z-[4] cursor-pointer text-white bg-[rgba(0,0,0,0.5)] opacity-0 hover:opacity-100">
                                    <input 
                                        type="file" 
                                        id={`qf-dimg-${prize_type_text}`} 
                                        onChange={handleImageFileInput} 
                                        className="hidden" 
                                    />
                                    <label htmlFor={`qf-dimg-${prize_type_text}`} className="">
                                        <MdOutlineAddAPhoto size={30} className="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer" />
                                    </label>
                                    <RiCloseLargeFill 
                                        size={30} 
                                        className="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer" 
                                        onClick={removeButtonClick} 
                                    />
                                </div>
                                <Image src={imageFile ? imageFile : defaultImage} width={700} height={500} className="w-full h-auto relative z-[2]" alt="photo" priority={true} />
                            </div>
                        </div>
                        <div className="w-full md:flex-1">
                            <div className="pb-[10px]">
                                <h6 className="transition-all delay-75 font-ubuntu text-[20px] md:text-[25px] text-zinc-800 dark:text-zinc-200">
                                    <b>{prize_type_text}<sup>{prize_possition_text}</sup></b> : Winner Prize
                                </h6>
                            </div>
                            <div className="pb-[20px]">
                                <input 
                                    type="text" 
                                    name="description" 
                                    className="ws-input-pwd-m1-v1" 
                                    placeholder="Description" 
                                    value={descr} 
                                    onChange={handleChangeDscr} 
                                />
                                {descError && (<div className="ws-input-error mt-[2px]">{descError}</div>)}
                            </div>
                            <div className="text-right">
                                <button type="submit" title="Save" className="transition-all delay-75 inline-block concard px-[20px] md:px-[25px] py-[10px] md:py-[12px] text-center text-white font-noto_sans font-semibold text-[16px] md:text-[18px] hover:shadow-lg">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default WinnerPrizeForm;