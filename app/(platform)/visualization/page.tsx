"use client";

import Image from "next/image";
import { Button, Avatar, Snippet } from "@nextui-org/react";
import {
  FaRegCalendarAlt,
  FaRegBookmark,
  FaBookmark,
  FaRegHeart,
  FaHeart,
  FaRegCopy,
  FaCalendarAlt,
} from "react-icons/fa";
import ClipboardJS from "clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import { arduinoLight, atelierCaveLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { DisplayTag, MiniDisplayTag } from "@/app/ui/small-components/DisplayTag";

const SourceCode = `{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "A scatter plot with trend line calculated via locally-weighted (loess) regression.",
  "padding": 5,
  "width": 500,
  "height": 500,
  "autosize": "pad",

  "signals": [
    {
      "name": "loessBandwidth", "value": 0.3,
      "bind": {"input": "range", "min": 0.05, "max": 1}
    },
    {
      "name": "groupby", "value": "none",
      "bind": {"input": "select", "options": ["none", "genre"]}
    }
  ],

  "data": [
    {
      "name": "movies",
      "url": "data/movies.json",
      "transform": [
        {
          "type": "filter",
          "expr": "datum['Rotten Tomatoes Rating'] != null && datum['IMDB Rating'] != null"
        }
      ]
    },
    {
      "name": "trend",
      "source": "movies",
      "transform": [
        {
          "type": "loess",
          "groupby": [{"signal": "groupby === 'genre' ? 'Major Genre' : 'foo'"}],
          "bandwidth": {"signal": "loessBandwidth"},
          "x": "Rotten Tomatoes Rating",
          "y": "IMDB Rating",
          "as": ["u", "v"]
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "linear",
      "domain": {"data": "movies", "field": "Rotten Tomatoes Rating"},
      "range": "width"
    },
    {
      "name": "y",
      "type": "linear",
      "domain": {"data": "movies", "field": "IMDB Rating"},
      "range": "height"
    }
  ],

  "marks": [
    {
      "type": "symbol",
      "from": {"data": "movies"},
      "encode": {
        "enter": {
          "x": {"scale": "x", "field": "Rotten Tomatoes Rating"},
          "y": {"scale": "y", "field": "IMDB Rating"},
          "fillOpacity": {"value": 0.5},
          "size": {"value": 16}
        }
      }
    },
    {
      "type": "group",
      "from": {
        "facet": {
          "data": "trend",
          "name": "curve",
          "groupby": "Major Genre"
        }
      },
      "marks": [
        {
          "type": "line",
          "from": {"data": "curve"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "u"},
              "y": {"scale": "y", "field": "v"},
              "stroke": {"value": "firebrick"}
            }
          }
        }
      ]
    }
  ]
}`;

export default function Page() {
  return (
    <div className="container py-6 px-8 md:px-24 lg:px-48 pb-12">
      <div className="flex flex-col">
        <div className="text-4xl font-semibold py-2">
          Loess Regression Example
        </div>
        <div className="flex flex-col sm:flex-row gap-x-4 gap-y-2 pt-2">
          <div className="flex flex-row gap-x-2">
            <p className="font-bold">Library</p>
            <div className="flex flex-row gap-x-1">
              <DisplayTag label="d3.js" />
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <p className="font-bold">Tags</p>
            <div className="flex flex-row gap-x-1">
              <DisplayTag label="graph_bar" />
              <DisplayTag label="regression" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between border-b py-2">
          <div className="flex flex-col md:flex-row justify-start gap-x-2 gap-y-2 py-2">
            <div className="flex flex-row items-center gap-x-2">
              <Avatar
                showFallback
                size={"sm"}
                src="https://images.unsplash.com/broken"
              />
              <p className="text-slate-600">@Username</p>
            </div>
            <div className="flex flex-row items-center gap-x-2">
            <FaRegCalendarAlt className="text-xl text-slate-600"/>
              <p className="text-slate-600 "> Posted 21 December 2022</p>
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <div className="flex flex-row items-center gap-x-2 cursor-pointer">
              <FaRegBookmark className="text-slate-600 text-xl" />
              <p>Bookmark</p>
            </div>
            <div className="flex flex-row items-center gap-x-2 cursor-pointer">
              <FaRegHeart className="text-slate-600 text-xl" />
              <p>Likes</p>
            </div>
          </div>
        </div>
        <div className="py-4">
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
            <Button className="bg-teal-600 text-white font-semibold shadow-xl">
              Preview
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between py-2">
            <div className="text-2xl font-semibold">Source Code</div>
            <div
              id="#copy-code"
              className="text-lg text-slate-500 cursor-pointer flex flex-row items-center gap-x-1"
              onClick={() => {
                ClipboardJS.copy(SourceCode);
                alert("Text copied to clipboard!");
              }}
            >
              <FaRegCopy />
              Copy
            </div>
          </div>
          <div className="px-4 py-4 bg-gray-200 rounded-lg overflow-y-auto">
            <SyntaxHighlighter
              className="text-sm"
              style={atelierCaveLight}
              customStyle={{ backgroundColor: "inherit" }}
              wrapLongLines={true}
            >
              {SourceCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
