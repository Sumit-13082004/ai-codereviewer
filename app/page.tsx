"use client";

import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const createUser = trpc.test.createTest.useMutation();
  const tests = trpc.test.getTests.useQuery();
  // console.log(tests);

  return (
    <div>
      <input onChange={(e) => setName(e.target.value)} />
      <input onChange={(e) => setTitle(e.target.value)} />

      <Button
        onClick={() =>
          createUser.mutate({ name, title })
        }
        className="cursor-pointer"
      >
        Create Test
      </Button>

      {tests && tests.data?.map((test: { id: string; name: string }) => (
        <div key={test.id}>{test.name}</div>
      ))}
    </div>
  );
}