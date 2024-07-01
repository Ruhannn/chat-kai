"use client";
import React from "react";
import { renderToString } from "react-dom/server";
import { Avatar } from "../ui/avatar";
import { AiOutlineTool, AiOutlineWarning } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { BsLightningCharge } from "react-icons/bs";
import { Message } from "ai";
import { Grid } from "react-loader-spinner";
import { cn } from "@/lib/utils";
import Image from "next/image";
export default function Bubble({
  message,
  loading = false,
}: {
  message: Message;
  loading?: boolean;
}) {
  return (
    <div
      key={message.id}
      className="flex flex-1 gap-3 my-4 text-sm text-gray-600">
      {message.role === "user" && (
        <Avatar className="w-8 h-8">
          <div className="p-1 bg-gray-100 border rounded-full">
            <svg
              stroke="none"
              fill="black"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
            </svg>
          </div>
        </Avatar>
      )}
      {message.role === "assistant" && (
        <Avatar className="w-8 h-8">
          {/* <AvatarFallback>M</AvatarFallback> */}
          <div
            className={cn(
              "rounded-full bg-gray-100 border p-1",
              loading && "animate-pulse"
            )}>
            <Image
             width={330} height={330}
             alt="" src="/Kya.png" />
          </div>
        </Avatar>
      )}
      <p className="leading-relaxed">
        <span className="block font-bold text-gray-700">
          {message.role === "user" ? "You" : "kya"}{" "}
        </span>
        {!loading && (
          <span
            dangerouslySetInnerHTML={{
              __html: message.content.endsWith("|>")
                ? message.content
                    .replaceAll(
                      `<|loading_tools|>`,
                      renderToString(
                        <div className="flex items-center gap-1 my-2">
                          <CgSpinner className="animate-spin" size={20} />
                          <span className="">Loading tools...</span>
                        </div>
                      )
                    )
                    .replaceAll(
                      `<|tool_error|>`,
                      renderToString(<AiOutlineWarning size={20} />)
                    )
                : message.content
                    .replaceAll(`<|tool_error|>`, "")
                    .replaceAll(
                      /\<\|tool_called[\s\S]*\$\$/g,
                      renderToString(
                        <>
                          <div className="flex flex-row items-center my-2">
                            {message.content.split("$$")[2] === "false" ? (
                              <AiOutlineTool size={20} />
                            ) : (
                              <BsLightningCharge
                                className="ms-mr-1 ms-fill-yellow-400"
                                size={18}
                              />
                            )}
                            <span className="ml-1">
                              {message.content.split("$$")[1]}
                            </span>
                          </div>
                        </>
                      )
                    )
                    .replaceAll(`<|loading_tools|>`, ""),
            }}
          />
        )}
        {loading && (
          <Grid
            height={12}
            width={12}
            radius={5}
            ariaLabel="grid-loading"
            color="#1a1a1a"
            ms-visible={true}
          />
        )}
      </p>
    </div>
  );
}
