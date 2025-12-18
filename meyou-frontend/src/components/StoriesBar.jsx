import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus, ArrowLeft } from 'lucide-react'
import moment from 'moment'
import StoryModel from './StoryModel'

const StoriesBar = () => {
  const [stories, setStories] = useState([])
  const [showModel, setShowModel] = useState(false)
  const [viewStory, setViewStory] = useState(null)

  const fetchStories = () => {
    setStories(dummyStoriesData)
  }

  useEffect(() => {
    fetchStories()
  }, [])

  // handler to hide story
  const handleCloseStory = () => {
    setViewStory(null)
    setShowModel(false)
  }

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        {/* Add story Card */}
        <div
          onClick={() => setShowModel(true)}
          className="rounded-lg shadow-sm min-w-[120px] max-w-[120px] max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white"
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 bg-amber-500 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-700 text-center">
              Create new Story
            </p>
          </div>
        </div>

        {/* Story Cards */}
        {stories.map((story, index) => (
          <div
            key={index}
            onClick={() => {
              setViewStory(story)
              setShowModel(true)
            }}
            className="relative rounded-lg shadow min-w-[120px] max-w-[120px] max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95"
          >
            <img
              src={story.user.profile_picture}
              alt=""
              className="absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow"
            />
            <p className="absolute top-16 left-3 text-white/60 text-sm truncate max-w-[96px]">
              {story.content}
            </p>
            <p className="text-white absolute bottom-1 right-2 z-10 text-xs">
              {moment(story.createdAt).fromNow()}
            </p>
            {story.media_type !== 'text' && (
              <div className="absolute inset-0 z-10 rounded-lg bg-black overflow-hidden">
                {story.media_type === 'image' ? (
                  <img
                    src={story.media_url}
                    alt=""
                    className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
                  />
                ) : (
                  <video
                    src={story.media_url}
                    className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Story Model with left arrow to hide */}
      {showModel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-md">
            {/* Left arrow button */}
            <button
              onClick={handleCloseStory}
              className="absolute top-2 left-2 text-gray-700 hover:text-black"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            {/* Render StoryModel */}
            <StoryModel
              setShowModel={setShowModel}
              fetchStories={fetchStories}
              story={viewStory}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default StoriesBar