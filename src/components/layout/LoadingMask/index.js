import React from "react";

export default function LoadingMask({ className }) {
  return (
    <div class={`${className} border border-pink-300 shadow rounded-md p-4 max-w-sm w-full mx-auto`}>
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-pink-400 h-12 w-12"></div>
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-pink-400 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-pink-400 rounded"></div>
            <div class="h-4 bg-pink-400 rounded w-5/6"></div>
          </div>
          <div class="space-y-2">
            <div class="h-4 bg-pink-400 rounded"></div>
            <div class="h-4 bg-pink-400 rounded w-5/6"></div>
          </div>
          <div class="space-y-2">
            <div class="h-4 bg-pink-400 rounded"></div>
            <div class="h-4 bg-pink-400 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}