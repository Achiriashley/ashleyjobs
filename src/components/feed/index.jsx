"use client";

import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { CirclePlus, Heart } from "lucide-react";
import { Input } from "../ui/input";
import PageHeader from "../page-header";
import { getSupabaseClient } from "@/utils/supabaseClient";
import { createFeedPostAction, updateFeedPostAction } from "@/actions";

function Feed({ user, profileInfo, allFeedPosts }) {
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    imageURL: "",
  });
  const [imageData, setImageData] = useState(null);

  function handleFileOnChange(event) {
    event.preventDefault();
    setImageData(event.target.files[0]);
  }

  function handleFetchImagePublicUrl(getData) {
    const { data } = getSupabaseClient().storage
      .from("job-board-public")
      .getPublicUrl(getData.path);

    console.log(data);

    if (data)
      setFormData({
        ...formData,
        imageURL: data.publicUrl,
      });
  }

  async function handleUploadImageToSupabase() {
    const { data, error } = await getSupabaseClient().storage
      .from("job-board-public")
      .upload(`/public/${imageData?.name}`, imageData, {
        cacheControl: "3600",
        upsert: false,
      });

    console.log(data, error);

    if (data) handleFetchImagePublicUrl(data);
  }

  async function handleSaveFeedPost() {
    await createFeedPostAction(
      {
        userId: user?.id,
        userName:
          profileInfo?.candidateInfo?.name || profileInfo?.recruiterInfo?.name,
        message: formData?.message,
        image: formData?.imageURL,
        likes: [],
      },
      "/feed"
    );

    setFormData({
      imageURL: "",
      message: "",
    });
  }

  async function handleUpdateFeedPostLikes(getCurrentFeedPostItem) {
    let cpyLikesFromCurrentFeedPostItem = [...getCurrentFeedPostItem.likes];
    const index = cpyLikesFromCurrentFeedPostItem.findIndex(
      (likeItem) => likeItem.reactorUserId === user?.id
    );

    if (index === -1)
      cpyLikesFromCurrentFeedPostItem.push({
        reactorUserId: user?.id,
        reactorUserName:
          profileInfo?.candidateInfo?.name || profileInfo?.recruiterInfo?.name,
      });
    else cpyLikesFromCurrentFeedPostItem.splice(index, 1);

    getCurrentFeedPostItem.likes = cpyLikesFromCurrentFeedPostItem;
    await updateFeedPostAction(getCurrentFeedPostItem, "/feed");
  }

  useEffect(() => {
    if (imageData) handleUploadImageToSupabase();
  }, [imageData]);

  console.log(allFeedPosts);

  return (
    <Fragment>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <PageHeader
          title="Explore Feed"
          action={
            <Button
              onClick={() => setShowPostDialog(true)}
              className="flex h-11 items-center justify-center px-5"
            >
              Add New Post
            </Button>
          }
        />
        <div className="py-10 pb-24">
          <div className="flex flex-col gap-5">
            {allFeedPosts && allFeedPosts.length > 0 ? (
              allFeedPosts.map((feedPostItem) => (
                <div
                  key={feedPostItem._id}
                  className="group flex flex-col gap-6 rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:shadow-lg sm:flex-row"
                >
                  <div className="overflow-hidden rounded-2xl sm:w-2/6">
                    <img
                      src={feedPostItem?.image}
                      alt="Post"
                      className="h-60 w-full object-cover object-top transition duration-500 group-hover:scale-105 sm:h-80"
                    />
                  </div>
                  <div className="sm:w-4/6">
                    <span className="mb-2 inline-block font-medium text-muted-foreground">
                      {feedPostItem?.userName}
                    </span>
                    <h3 className="mb-6 text-2xl font-bold text-foreground sm:text-4xl">
                      {feedPostItem?.message}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Heart
                        size={22}
                        className={
                          feedPostItem?.likes?.length > 0
                            ? "cursor-pointer fill-primary text-primary"
                            : "cursor-pointer text-muted-foreground"
                        }
                        onClick={() => handleUpdateFeedPostLikes(feedPostItem)}
                      />
                      <span className="text-xl font-semibold text-foreground">
                        {feedPostItem?.likes?.length}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-16 text-center text-muted-foreground">
                No posts found yet.
              </p>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={showPostDialog}
        onOpenChange={() => {
          setShowPostDialog(false);
          setFormData({
            message: "",
            imageURL: "",
          });
        }}
      >
        <DialogContent className="h-[550px]">
          <Textarea
            name="message"
            value={formData?.message}
            onChange={(event) =>
              setFormData({
                ...formData,
                message: event.target.value,
              })
            }
            placeholder="What do you want to talk about?"
            className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[200px] text-[28px]"
          />

          <div className="flex gap-5 items-center justify-between">
            <Label htmlFor="imageURL">
              <CirclePlus />
              <Input
                onChange={handleFileOnChange}
                className="hidden"
                id="imageURL"
                type="file"
              />
            </Label>
            <Button
              onClick={handleSaveFeedPost}
              disabled={formData?.imageURL === "" && formData?.message === ""}
              className="flex w-40 h-11 items-center justify-center px-5 disabled:opacity-65"
            >
              Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default Feed;