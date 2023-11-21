"use client";

import Image from "next/image";
import { Button } from "@nextui-org/react";

export default function Page() {
  return (
    <div className="container py-6 px-8 sm:px-48">
      <div className="flex flex-col">
        <div className="text-4xl">Loess Regression Example</div>
        <div className="flex flex-col sm:flex-row gap-x-4">
          <div>
            Library <span> Vega</span>
          </div>
          <div>
            Tags<span> Graph Bar</span>
          </div>
        </div>
        <div className="flex flex-row justify-between border-b py-2">
          <div>
            <span>img username</span>
            <span>posted december 2021</span>
          </div>
          <div>
            <span>bookmark</span>
            <span>Like</span>
          </div>
        </div>
        <div>
          Locally-estimated regression produces a trend line by performing
          weighted regressions over a sliding window of points. The loess method
          (for locally-estimated scatterplot smoothing) computes a sequence of
          local linear regressions to estimate smoothed points. The bandwidth
          parameter determines the size of the sliding window of
          nearest-neighbor points, expressed as a fraction of the total number
          of points included. Alternatively, see the regression example for
          regression results using parametric functions.
        </div>
        <div>
          <div className="flex justify-center">
            <Image
              src="/loess_regression.png"
              alt=""
              width={900}
              height={400}
            />
          </div>
          <div className="flex justify-center">
            <Button className="bg-teal-600 text-white font-semibold shadow-xl">Preview</Button>
          </div>
        </div>
        <div>
          <div>
            <div className="text-2xl font-semibold">Source Code</div>
            <div className="text-lg">Copy</div>
          </div>
          <div>code x=1</div>
        </div>
      </div>
    </div>
  );
}
