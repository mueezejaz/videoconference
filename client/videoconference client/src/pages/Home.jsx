import React, { useRef, useState } from "react";
import Switcher from "../components/Switcher";
import { Button } from "../components/ui/button.jsx";
import Cardsforswitching from "../components/Cardsforswitching";
// dialog
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
// form imports
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCopy } from "react-icons/io5";
import { IoVideocamOff } from "react-icons/io5";
import { IoIosMicOff } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { IoIosMic } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../components/ui/input";
import { Copybutten } from "@/components/Copybutten";

const Home = () => {
  const [side, setside] = useState(true);
  return (
    <div className="bg-mainbg flex items-center justify-center w-screen h-screen">
      <div className="bg-secondbg overflow-hidden w-[20rem] h-[28rem] rounded-md">
        <Switcher
          sideone="Join Room"
          sidetwo="Create Room"
          setside={setside}
          side={side}
        />
        <Cardsforswitching setside={setside} side={side}>
          <JoinroomForm />
          <Createroom />
        </Cardsforswitching>
      </div>
      <Toaster className="bg-warning" />
    </div>
  );
};

const JoinroomForm = () => {
  const [open, setopen] = useState(false);
  console.log(open);
  const [mediaPermissions, setmediaPermissions] = useState({
    mic: false,
    video: false,
  });
  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(50),
    roomid: z
      .string()
      .min(7, {
        message: "Roomid must be at least 7 characters.",
      })
      .max(7),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      roomid: "",
    },
  });
  function onSubmit(values) {
    console.log(values);
  }
  return (
    <>
      <Dialogbox open={open} setopen={setopen} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-text mx-4 my-[20px] space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-fourthbg focus:outline-none tracking-wider caret-text font-medium text-text border-none placeholder:text-text"
                      placeholder="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-warning" />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="roomid"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Room id</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-fourthbg focus:outline-none tracking-wider caret-text font-medium text-text border-none placeholder:text-text"
                      placeholder="Room id"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-warning" />
                </FormItem>
              </>
            )}
          />
          <div className="flex w-full items-center">
            <Button className="bg-thirdbg mx-auto" type="submit">
              Join
            </Button>
          </div>
        </form>
      </Form>
      <div className="w-full h-[40px]  flex items-center justify-center">
        <div className="w-[85%] h-full flex items-center justify-around">
          {mediaPermissions.mic ? (
            <IoIosMic
              onClick={() => {
                setmediaPermissions({
                  ...mediaPermissions,
                  mic: mediaPermissions.mic ? false : true,
                });
              }}
              className="text-text cursor-pointer w-[60%] h-[60%]"
            />
          ) : (
            <IoIosMicOff
              onClick={() => {
                setmediaPermissions({
                  ...mediaPermissions,
                  mic: mediaPermissions.mic ? false : true,
                });
              }}
              className="text-text cursor-pointer w-[60%] h-[60%]"
            />
          )}
          {mediaPermissions.video ? (
            <IoVideocam
              onClick={() => {
                setmediaPermissions({
                  ...mediaPermissions,
                  video: mediaPermissions.video ? false : true,
                });
              }}
              className="text-text cursor-pointer w-[60%] h-[60%]"
            />
          ) : (
            <IoVideocamOff
              onClick={() => {
                setmediaPermissions({
                  ...mediaPermissions,
                  video: mediaPermissions.video ? false : true,
                });
              }}
              className="text-text cursor-pointer w-[60%] h-[60%]"
            />
          )}
          <IoPersonAddSharp
            onClick={() => {
              setopen(open ? false : true);
            }}
            className="text-text cursor-pointer w-[60%] h-[60%]"
          />
        </div>
      </div>
    </>
  );
};

const Createroom = () => {
  const [open, setopen] = useState(false);
  const [copy, setcopy] = useState(false);
  const inputRef = useRef(null);
  const [mediaPermissions, setmediaPermissions] = useState({
    mic: false,
    video: false,
  });
  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(50),
    Roomid: z
      .string()
      .min(7, {
        message: "Roomid must be at least 7 characters.",
      })
      .max(7),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      Roomid: "1234567",
    },
  });
  function onSubmit(values) {
    console.log(values);
  }
  return (
    <>
      <Dialogbox open={open} setopen={setopen} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-text mx-4 my-[20px] space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-fourthbg focus:outline-none tracking-wider caret-text font-medium text-text border-none placeholder:text-text"
                      placeholder="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-warning" />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="Roomid"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Roomid</FormLabel>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        readOnly
                        className="bg-fourthbg focus:outline-none tracking-wider w-[95%] caret-text font-medium text-text border-none placeholder:text-text"
                        {...field}
                        ref={inputRef}
                      />
                    </FormControl>
                    <Copybutten
                      inputRef={inputRef}
                      setcopy={setcopy}
                      copy={copy}
                    />
                  </div>
                  <FormDescription>
                    Share this meeting id to invite others..
                  </FormDescription>
                  <FormMessage className="text-warning" />
                </FormItem>
              </>
            )}
          />
          <div className="flex w-full items-center">
            <Button className="bg-thirdbg mx-auto" type="submit">
              Creat
            </Button>
          </div>
        </form>
      </Form>
      <div className="w-full h-[40px]  flex items-center justify-center">
        <div className="w-[85%] h-full flex items-center justify-around">
          {mediaPermissions.mic ? (
            <IoIosMic
              onClick={() => {
                setmediaPermissions({
                  ...mediaPermissions,
                  mic: mediaPermissions.mic ? false : true,
                });
              }}
              className="text-text cursor-pointer w-[60%] h-[60%]"
            />
          ) : (
            <IoIosMicOff
              onClick={() => {
                setmediaPermissions({
                  ...mediaPermissions,
                  mic: mediaPermissions.mic ? false : true,
                });
              }}
              className="text-text cursor-pointer w-[60%] h-[60%]"
            />
          )}
          {mediaPermissions.video ? (
            <IoVideocam
              onClick={() => {
                setmediaPermissions({
                  ...mediaPermissions,
                  video: mediaPermissions.video ? false : true,
                });
              }}
              className="text-text cursor-pointer w-[60%] h-[60%]"
            />
          ) : (
            <IoVideocamOff
              onClick={() => {
                setmediaPermissions({
                  ...mediaPermissions,
                  video: mediaPermissions.video ? false : true,
                });
              }}
              className="text-text cursor-pointer w-[60%] h-[60%]"
            />
          )}
          <IoPersonAddSharp
            onClick={() => {
              setopen(open ? false : true);
            }}
            className="text-text cursor-pointer w-[60%] h-[60%]"
          />
        </div>
      </div>
    </>
  );
};

function Dialogbox({ open, setopen }) {
  const [copy, setcopy] = useState(false);
  const inputRef = useRef(null);
  const { toast } = useToast();
  return (
    <>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogContent className="sm:max-w-md bg-thirdbg text-text border-none">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Share this meeting link to invite others.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="contents">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                ref={inputRef}
                className="bg-fourthbg"
                id="link"
                defaultValue="https://ui.shadcn.com/docs/installation"
                readOnly
              />
              <Copybutten inputRef={inputRef} setcopy={setcopy} copy={copy} />
            </div>
          </div>
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default Home;
