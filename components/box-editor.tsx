
"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  Download,
  ImagePlus,
  RotateCcw,
  Save,
  LockKeyhole,
  Package,
  SlidersHorizontal,
} from "lucide-react";

const faces = [
  "Front",
  "Back",
  "Left",
  "Right",
  "Top",
  "Bottom",
] as const;

type Face = (typeof faces)[number];

type Images = Record<Face, string | null>;

type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

const defaultDimensions: Dimensions = {
  width: 2.55,
  height: 3.3,
  depth: 0.85,
};

function createFaceMaterial(url: string | null) {
  if (!url) {
    return new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.62,
      metalness: 0,
    });
  }

  const texture = new THREE.TextureLoader().load(url);
  texture.colorSpace = THREE.SRGBColorSpace;

  return new THREE.MeshStandardMaterial({
    map: texture,
    color: "#ffffff",
    roughness: 0.65,
    metalness: 0,
  });
}

function Model({
  images,
  dimensions,
}: {
  images: Images;
  dimensions: Dimensions;
}) {
  const materials = useMemo(() => {
    return [
      createFaceMaterial(images.Right),
      createFaceMaterial(images.Left),
      createFaceMaterial(images.Top),
      createFaceMaterial(images.Bottom),
      createFaceMaterial(images.Front),
      createFaceMaterial(images.Back),
    ];
  }, [images]);

  return (
    <group rotation={[0.025, -0.08, 0]}>
      <mesh castShadow receiveShadow material={materials}>
        <boxGeometry
          args={[
            dimensions.width,
            dimensions.height,
            dimensions.depth,
          ]}
        />
      </mesh>
    </group>
  );
}

export default function BoxEditor() {
  const [images, setImages] = useState<Images>({
    Front: null,
    Back: null,
    Left: null,
    Right: null,
    Top: null,
    Bottom: null,
  });

  const [dimensions, setDimensions] =
    useState<Dimensions>(defaultDimensions);

  const [name, setName] = useState("My first software box");
  const [selected, setSelected] = useState<Face>("Front");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const [previewCanvas, setPreviewCanvas] =
    useState<HTMLCanvasElement | null>(null);

  function updateDimension(
    key: keyof Dimensions,
    value: number
  ) {
    setDimensions((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function upload(face: Face, file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Choose an image file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setMessage("Image must be under 8 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImages((current) => ({
        ...current,
        [face]: String(reader.result),
      }));

      setMessage(`${face} artwork added.`);
    };

    reader.onerror = () => {
      setMessage("Could not read the selected image.");
    };

    reader.readAsDataURL(file);
  }

  async function save() {
    setBusy(true);
    setMessage("");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          faces: images,
        }),
      });

      let data: { error?: string } = {};

      try {
        data = await response.json();
      } catch {}

      setMessage(
        response.ok
          ? "Project saved successfully."
          : data.error || "Could not save project."
      );
    } catch (error) {
      console.error("Project save error:", error);
      setMessage("Could not save project.");
    } finally {
      setBusy(false);
    }
  }

  async function download() {
    setBusy(true);
    setMessage("");

    try {
      const canvas = previewCanvas;

      if (
        !canvas ||
        typeof canvas.toBlob !== "function" ||
        canvas.width === 0 ||
        canvas.height === 0
      ) {
        setMessage("3D preview is not ready. Please try again.");
        return;
      }

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) {
              resolve(result);
            } else {
              reject(new Error("PNG creation failed."));
            }
          },
          "image/png"
        );
      });

      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        window.location.href = "/login?callbackUrl=%2Feditor";
        return;
      }

      if (response.status === 403) {
        let error = "An active subscription is required.";

        try {
          const data = await response.json();
          error = data.error || error;
        } catch {}

        setMessage(error);
        return;
      }

      if (!response.ok) {
        let error = "Download authorization failed.";

        try {
          const data = await response.json();
          error = data.error || error;
        } catch {}

        throw new Error(error);
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      const safeName =
        name.trim().replace(/[^a-z0-9-_]+/gi, "-") ||
        "reva-software-box";

      link.href = url;
      link.download = `${safeName}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 2000);

      setMessage("Transparent PNG downloaded successfully.");
    } catch (error) {
      console.error("PNG download error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Could not download PNG. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  function resetImages() {
    setImages({
      Front: null,
      Back: null,
      Left: null,
      Right: null,
      Top: null,
      Bottom: null,
    });

    setDimensions(defaultDimensions);
    setMessage("Box artwork and dimensions have been reset.");
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">

      {/* 3D Preview */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-transparent text-slate-900">

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <Package size={17} className="text-violet-500" />

            <p className="font-semibold text-white">
              {name}
            </p>
          </div>

          <button
            type="button"
            onClick={resetImages}
            disabled={busy}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            <RotateCcw size={15} className="text-white" />
            <span className="text-white">Reset</span>
          </button>
        </div>

        {/* Transparent 3D Canvas */}
        <div className="h-[380px] bg-transparent sm:h-[500px]">
          <Canvas
            className="box-preview-canvas"
            shadows={false}
            camera={{
              position: [4.8, 3.5, 6],
              fov: 36,
            }}
            gl={{
              preserveDrawingBuffer: true,
              alpha: true,
              antialias: true,
            }}
            onCreated={({ gl, scene }) => {
              gl.setClearColor("#000000", 0);
              scene.background = null;
              setPreviewCanvas(gl.domElement);
            }}
          >
            <ambientLight intensity={1.1} />

            <directionalLight
              position={[4, 7, 6]}
              intensity={2.5}
            />

            <pointLight
              position={[-4, 2, -3]}
              intensity={0.8}
              color="#c4b5fd"
            />

            <pointLight
              position={[3, 1, 4]}
              intensity={0.5}
              color="#ffffff"
            />

            <Model
              images={images}
              dimensions={dimensions}
            />

            <OrbitControls
              makeDefault
              enableDamping
              dampingFactor={0.08}
              minDistance={4}
              maxDistance={12}
              minPolarAngle={0.3}
              maxPolarAngle={Math.PI / 1.7}
            />
          </Canvas>
        </div>

        {/* Preview Footer */}
        <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 px-5 py-4">
          <p className="self-center text-xs text-slate-500">
            Drag to rotate · Scroll to zoom
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={save}
              disabled={busy}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              <Save size={16} className="text-white" />
              <span className="text-white">Save</span>
            </button>

            <button
              type="button"
              onClick={download}
              disabled={busy}
              className="flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:opacity-50"
            >
              <Download size={16} />
              {busy ? "Please wait..." : "Download PNG"}
            </button>
          </div>
        </div>

        {message && (
          <p
            role="status"
            className="border-t border-slate-200 px-5 py-3 text-sm text-slate-700"
          >
            {message}
          </p>
        )}
      </section>

      {/* Editor Sidebar */}
      <aside className="space-y-5">

        {/* Project Settings */}
        <div className="rounded-3xl border border-white/10 bg-white/[.025] p-5">
          <div className="flex items-center gap-2">
            <Package size={18} className="text-violet-400" />

            <h2 className="font-bold">
              Project settings
            </h2>
          </div>

          <label
            htmlFor="project"
            className="mb-2 mt-4 block text-sm text-slate-300"
          >
            Project name
          </label>

          <input
            id="project"
            className="field text-white placeholder:text-slate-400"
            value={name}
            maxLength={100}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Adjustable Dimensions */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                size={16}
                className="text-violet-400"
              />

              <p className="text-sm font-semibold text-white">
                Adjustable box sides
              </p>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Drag the sliders to resize your package.
            </p>

            <div className="mt-5 space-y-5">
              {(
                [
                  {
                    key: "width",
                    label: "Width",
                    min: 1.5,
                    max: 5,
                    step: 0.05,
                  },
                  {
                    key: "height",
                    label: "Height",
                    min: 1.5,
                    max: 5,
                    step: 0.05,
                  },
                  {
                    key: "depth",
                    label: "Depth / Thickness",
                    min: 0.2,
                    max: 2.5,
                    step: 0.05,
                  },
                ] as const
              ).map((item) => (
                <div key={item.key}>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor={`dimension-${item.key}`}
                      className="text-sm text-slate-300"
                    >
                      {item.label}
                    </label>

                    <span className="text-sm font-bold tabular-nums text-violet-300">
                      {dimensions[item.key].toFixed(2)}
                    </span>
                  </div>

                  <input
                    id={`dimension-${item.key}`}
                    type="range"
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    value={dimensions[item.key]}
                    onChange={(e) =>
                      updateDimension(
                        item.key,
                        Number(e.target.value)
                      )
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-violet-500"
                  />

                  <div className="mt-1 flex justify-between text-[10px] text-slate-500">
                    <span>{item.min.toFixed(1)}</span>
                    <span>{item.max.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setDimensions(defaultDimensions)}
              className="mt-5 w-full rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:bg-white/5"
            >
              Reset dimensions
            </button>
          </div>
        </div>

        {/* Artwork Editor */}
        <div className="rounded-3xl border border-white/10 bg-white/[.025] p-5">
          <div className="flex justify-between">
            <h2 className="font-bold">
              Package artwork
            </h2>

            <span className="text-xs text-slate-400">
              {faces.filter((face) => images[face]).length}/6
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Select a packaging face, then upload its own image.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {faces.map((face) => (
              <button
                type="button"
                key={face}
                onClick={() => setSelected(face)}
                className={`rounded-xl border p-3 text-left transition ${
                  selected === face
                    ? "border-violet-400 bg-violet-500/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <span className="block text-sm font-semibold text-white">
                  {face}
                </span>

                <span className="mt-1 block text-xs text-slate-400">
                  {images[face] ? "Image added" : "No image"}
                </span>
              </button>
            ))}
          </div>

          <label
            htmlFor="face-upload"
            className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-violet-400/40 p-4 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/10"
          >
            <ImagePlus size={18} />
            Upload {selected} image
          </label>

          <input
            id="face-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              upload(selected, e.target.files?.[0]);
              e.currentTarget.value = "";
            }}
          />

          {images[selected] && (
            <div className="mt-3 flex items-center gap-3">
              <img
                src={images[selected]!}
                alt={`${selected} face`}
                className="h-14 w-14 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="text-xs font-semibold text-white">
                  {selected} artwork
                </p>

                <p className="text-xs text-slate-400">
                  Image uploaded
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setImages((current) => ({
                    ...current,
                    [selected]: null,
                  }))
                }
                className="text-sm text-red-300 hover:text-red-200"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Export Information */}
        <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[.04] p-4">
          <div className="flex gap-3">
            <LockKeyhole
              size={18}
              className="shrink-0 text-amber-200"
            />

            <div>
              <p className="text-sm font-semibold text-amber-100">
                Protected downloads
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Downloads are checked against your active subscription.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
