"use client";

import React, { useEffect, useState } from "react";
import QueryInput from "./queryinput";
import { homeSearchParamsCache } from "@/lib/searchParams";
import { getSpaces } from "@/app/actions/fetchers";
import { useRouter } from "next/navigation";
import { createChatThread } from "@/app/actions/doers";

function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // TODO: use this to show a welcome page/modal
  // const { firstTime } = homeSearchParamsCache.parse(searchParams);
  const { push } = useRouter();

  const [spaces, setSpaces] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    getSpaces().then((res) => {
      if (res.success && res.data) {
        setSpaces(res.data);
        return;
      }
      // TODO: HANDLE ERROR
    });
  }, []);

  return (
    <div className="max-w-3xl h-full justify-center flex mx-auto w-full flex-col">
      {/* all content goes here */}
      {/* <div className="">hi {firstTime ? 'first time' : ''}</div> */}

      <div className="w-full h-96">
        <QueryInput
          handleSubmit={async (q, spaces) => {
            const threadid = await createChatThread(q);

            push(
              `/chat/${threadid.data}?spaces=${JSON.stringify(spaces)}&q=${q}`,
            );
          }}
          initialSpaces={spaces}
        />
      </div>
    </div>
  );
}

export default Page;
