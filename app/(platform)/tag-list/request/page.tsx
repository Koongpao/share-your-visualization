"use client";
import { use, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { RadioGroup, Radio, cn, Button } from "@nextui-org/react";
import { handleTab, handleOnChange } from "@/app/lib/functions";
import { Input } from "@nextui-org/react";
import { RequestNewTag, GetAllTags } from "@/app/lib/controller";
import { TlibraryAndTags } from "@/app/lib/definitions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import RequestTagSuccess from "./request-tag-success";
import RequestTagFailed from "./request-tag-failed";

export default function Page() {
  const router = useRouter();

  const [availableTagList, setAvailableTagList] = useState<string[]>([]);

  const getAllTagsData = async () => {
    const { data, message, success }: { data: TlibraryAndTags; message: string; success: boolean } = await GetAllTags();
    const resTagList = data.library.map((item) => item.name);
    const resLibraryList = data.tags.map((item) => item.name);
    setAvailableTagList([...resTagList, ...resLibraryList]);
  };

  const [tagName, setTagName] = useState<string>("");
  const [isLibrary, setIsLibrary] = useState<string>("no");

  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const checkIfError = () => {
    if (tagName.length === 0) {
      return false;
    } else if (availableTagList.includes(tagName)) {
      return true;
    } else if (!/^[a-z_]+$/.test(tagName)) {
      return true;
    }
  };

  const errorMessageOnError = () => {
    if (tagName.length === 0) {
      return "";
    } else if (availableTagList.includes(tagName)) {
      return "Tag already exists";
    } else if (!/^[a-z_]+$/.test(tagName)) {
      return "Invalid format";
    }
    return "";
  };

  useEffect(() => {
    if (tagName.length > 0 && !availableTagList.includes(tagName) && /^[a-z_]+$/.test(tagName)) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [tagName]);

  const handleSubmit = async () => {
    setCanSubmit(false);
    const is_library = isLibrary === "yes" ? true : false;
    const response = await RequestNewTag(getSession, tagName, is_library);
    if (response.success) {
      setRequestSuccess(true);
    } else if (!response.success) {
      setRequestFailed(true);
    }
  };

  useEffect(() => {
    getAllTagsData();
  }, []);

  const tagNameMaxChar = 20;

  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);
  const [requestFailed, setRequestFailed] = useState<boolean>(false);

  if (requestSuccess) return <RequestTagSuccess />;
  if (requestFailed) return <RequestTagFailed />;

  return (
    <div className="container py-6 px-8 md:px-24 lg:px-72 xl:px-96 pb-12">
      <div className="py-2 border-b w-full ">
        <div className="text-4xl font-semibold py-2 flex flex-row gap-x-2">
          <BsPencilSquare />
          Request a New Tag
        </div>
      </div>
      <div className="pt-4 pb-2 lg:pt-8">
        <Input
          size="lg"
          variant="bordered"
          label="Tag Name"
          autoCorrect="off"
          labelPlacement="outside"
          autoComplete="off"
          type="text"
          classNames={{
            label: "text-xl font-medium text-slate-700",
            input: "placeholder:text-slate-300",
          }}
          placeholder="bar_chart"
          isInvalid={checkIfError()}
          errorMessage={errorMessageOnError()}
          onChange={(e) => handleOnChange(e, setTagName, tagNameMaxChar)}
          onKeyDown={(e) => handleTab(e, setTagName)}
          value={tagName}
        />
        <div className="text-gray-400 font-regular text-sm flex justify-between">
          <div className="flex flex-row gap-1 items-center">
            <IoMdInformationCircle />
            <label>Tag Name. (Max {tagNameMaxChar} characters.)</label>
            <label className="text-red-400">* Required</label>
          </div>
          <label>{tagName.length}</label>
        </div>
      </div>
      <div className="py-4">
        <div className="font-medium pb-2 text-xl text-slate-700">Library Tag?</div>
        <RadioGroup defaultValue="no" orientation="horizontal" value={isLibrary} onValueChange={setIsLibrary}>
          <Radio
            value="no"
            classNames={{
              base: cn(
                "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                "data-[selected=true]:border-primary border-solid border-gray-200"
              ),
            }}
          >
            No
          </Radio>
          <Radio
            value="yes"
            classNames={{
              base: cn(
                "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                "data-[selected=true]:border-primary border-solid border-gray-200"
              ),
            }}
          >
            Yes
          </Radio>
        </RadioGroup>
      </div>
      <div className="py-4 flex flex-row gap-4 items-center">
        <Button
          className="font-semibold text-md text-white bg-teal-600"
          isDisabled={!canSubmit}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
        {/* <Button className="font-semibold text-md text-gray-500 bg-transparent" onClick={() => router.refresh()}>
          Clear
        </Button> */}
      </div>
    </div>
  );
}
