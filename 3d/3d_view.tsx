import React, { type ReactNode, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html, RoundedBox } from "@react-three/drei";

type Vec3 = [number, number, number];

type ObjectItem = {
  id: number;
  title: string;
  region: string;
  year: string;
  ethnicGroup: string;
  description: string;
  imageUrl: string;
  objectUrl: string;
};

type CardProps = {
  className?: string;
  children: ReactNode;
};

function Card({ className = "", children }: CardProps) {
  return <div className={className}>{children}</div>;
}

function CardHeader({ className = "", children }: CardProps) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }: CardProps) {
  return <div className={className}>{children}</div>;
}

function CardTitle({ className = "", children }: CardProps) {
  return <h2 className={className}>{children}</h2>;
}

type ButtonProps = {
  variant?: "default" | "outline";
  onClick?: () => void;
  children: ReactNode;
};

function Button({ variant = "default", onClick, children }: ButtonProps) {
  const variantClasses =
    variant === "outline"
      ? "border border-neutral-300 bg-white hover:bg-neutral-100"
      : "bg-neutral-900 text-white hover:bg-neutral-800";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex rounded-xl px-3 py-1.5 text-sm font-medium ${variantClasses}`}
    >
      {children}
    </button>
  );
}

const objects: ObjectItem[] = [
  {
    id: 1,
    title: "Seelik",
    region: "Võrumaa",
    year: "1912",
    ethnicGroup: "Setu",
    description: "Traditional skirt from the museum collection.",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    objectUrl: "https://example.com/object/1",
  },
  {
    id: 2,
    title: "Vöö",
    region: "Tartumaa",
    year: "1904",
    ethnicGroup: "Estonian",
    description: "Decorative woven belt with regional patterns.",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    objectUrl: "https://example.com/object/2",
  },
  {
    id: 3,
    title: "Põll",
    region: "Viljandimaa",
    year: "1921",
    ethnicGroup: "Estonian",
    description: "Apron used as part of traditional clothing.",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    objectUrl: "https://example.com/object/3",
  },
  {
    id: 4,
    title: "Särk",
    region: "Põlvamaa",
    year: "1898",
    ethnicGroup: "Setu",
    description: "Traditional shirt with embroidered details.",
    imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    objectUrl: "https://example.com/object/4",
  },
  {
    id: 5,
    title: "Kinnas",
    region: "Saaremaa",
    year: "1930",
    ethnicGroup: "Estonian",
    description: "Patterned mitten from an archival collection.",
    imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
    objectUrl: "https://example.com/object/5",
  },
  {
    id: 6,
    title: "Pearätt",
    region: "Valgamaa",
    year: "1915",
    ethnicGroup: "Estonian",
    description: "Head covering used in local festive dress.",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    objectUrl: "https://example.com/object/6",
  },
  {
    id: 7,
    title: "Helmekee",
    region: "Harjumaa",
    year: "1908",
    ethnicGroup: "Estonian",
    description: "Beaded necklace preserved in the archive.",
    imageUrl: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    objectUrl: "https://example.com/object/7",
  },
  {
    id: 8,
    title: "Tanuk",
    region: "Läänemaa",
    year: "1889",
    ethnicGroup: "Estonian",
    description: "Ceremonial headdress connected to regional traditions.",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    objectUrl: "https://example.com/object/8",
  },
  {
    id: 9,
    title: "Sõlg",
    region: "Järvamaa",
    year: "1919",
    ethnicGroup: "Estonian",
    description: "Decorative brooch used in traditional costume.",
    imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca5?auto=format&fit=crop&w=900&q=80",
    objectUrl: "https://example.com/object/9",
  },
  {
    id: 10,
    title: "Rahvariide komplekt",
    region: "Võrumaa",
    year: "1927",
    ethnicGroup: "Setu",
    description: "Complete traditional clothing ensemble from the collection.",
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    objectUrl: "https://example.com/object/10",
  },
];

type WallLabelProps = {
  text: string;
  position: Vec3;
};

function WallLabel({ text, position }: WallLabelProps) {
  return (
    <Text
      position={position}
      fontSize={0.22}
      color="#1f2937"
      anchorX="center"
      anchorY="middle"
      maxWidth={3}
    >
      {text}
    </Text>
  );
}

type ArtworkProps = {
  item: ObjectItem;
  position: Vec3;
  rotation?: Vec3;
  onSelect: (item: ObjectItem) => void;
};

function Artwork({ item, position, rotation = [0, 0, 0], onSelect }: ArtworkProps) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox
        args={[2.2, 2.8, 0.08]}
        radius={0.05}
        smoothness={4}
        onClick={() => onSelect(item)}
      >
        <meshStandardMaterial color="#f5f5f4" />
      </RoundedBox>

      <Html transform position={[0, 0.05, 0.055]} distanceFactor={1.5}>
        <div
          onClick={() => onSelect(item)}
          className="w-[260px] rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden cursor-pointer"
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-[230px] w-full object-cover"
          />
          <div className="p-3">
            <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
            <p className="text-xs text-neutral-500">{item.region} · {item.year}</p>
          </div>
        </div>
      </Html>

      <Text
        position={[0, -1.7, 0.06]}
        fontSize={0.16}
        color="#111827"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {item.title}
      </Text>
    </group>
  );
}

type RoomProps = {
  items: ObjectItem[];
  onSelect: (item: ObjectItem) => void;
};

function Room({ items, onSelect }: RoomProps) {
  const leftWallItems = items.slice(0, 5);
  const rightWallItems = items.slice(5, 10);
  const backWallItems = items.slice(10, 15);
  const extraWallItems = items.slice(15, 20);

  return (
    <group>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} />
      <pointLight position={[0, 4, 0]} intensity={1} />

      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#e7e5e4" />
      </mesh>

      <mesh position={[0, 2, -8.5]}>
        <boxGeometry args={[18, 8.5, 0.3]} />
        <meshStandardMaterial color="#fafaf9" />
      </mesh>
      <mesh position={[-8.5, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[18, 8.5, 0.3]} />
        <meshStandardMaterial color="#f5f5f4" />
      </mesh>
      <mesh position={[8.5, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[18, 8.5, 0.3]} />
        <meshStandardMaterial color="#f5f5f4" />
      </mesh>

      <WallLabel text="Estonian Cultural Heritage Exhibition" position={[0, 5.2, -8.25]} />
      <WallLabel text="Selected archival objects in a simple virtual gallery" position={[0, 4.8, -8.25]} />

      {leftWallItems.map((item, index) => (
        <Artwork
          key={item.id}
          item={item}
          position={[-8.25, 4.2 - index * 1.55, 5 - (index % 5) * 2.4]}
          rotation={[0, Math.PI / 2, 0]}
          onSelect={onSelect}
        />
      ))}

      {rightWallItems.map((item, index) => (
        <Artwork
          key={item.id}
          item={item}
          position={[8.25, 4.2 - index * 1.55, 5 - (index % 5) * 2.4]}
          rotation={[0, -Math.PI / 2, 0]}
          onSelect={onSelect}
        />
      ))}

      {backWallItems.map((item, index) => (
        <Artwork
          key={item.id}
          item={item}
          position={[-5 + index * 2.7, 1.6, -8.2]}
          rotation={[0, 0, 0]}
          onSelect={onSelect}
        />
      ))}

      {extraWallItems.map((item, index) => (
        <Artwork
          key={item.id}
          item={item}
          position={[-5 + index * 2.7, 4.6, -8.2]}
          rotation={[0, 0, 0]}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

type DetailsPanelProps = {
  item: ObjectItem | null;
  onClose: () => void;
};

function DetailsPanel({ item, onClose }: DetailsPanelProps) {
  if (!item) return null;

  return (
    <div className="absolute right-4 top-4 z-20 w-[340px] max-w-[calc(100vw-2rem)]">
      <Card className="rounded-3xl shadow-2xl border-neutral-200 bg-white/95 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <p className="mt-1 text-sm text-neutral-500">
                {item.region} · {item.year} · {item.ethnicGroup}
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-52 w-full rounded-2xl object-cover"
          />
          <p className="text-sm leading-6 text-neutral-700">{item.description}</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-neutral-100 p-3">
              <p className="text-neutral-500">Region</p>
              <p className="font-medium text-neutral-900">{item.region}</p>
            </div>
            <div className="rounded-2xl bg-neutral-100 p-3">
              <p className="text-neutral-500">Year</p>
              <p className="font-medium text-neutral-900">{item.year}</p>
            </div>
            <div className="col-span-2 rounded-2xl bg-neutral-100 p-3">
              <p className="text-neutral-500">Ethnic group</p>
              <p className="font-medium text-neutral-900">{item.ethnicGroup}</p>
            </div>
          </div>
          <a
            href={item.objectUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            Open source record
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

type IntroPanelProps = {
  itemCount: number;
};

function IntroPanel({ itemCount }: IntroPanelProps) {
  return (
    <div className="absolute left-4 top-4 z-20 max-w-md">
      <Card className="rounded-3xl shadow-xl border-neutral-200 bg-white/95 backdrop-blur">
        <CardContent className="p-5">
          <h1 className="text-2xl font-semibold tracking-tight">Virtual Heritage Exhibition</h1>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            A small browser-based exhibition for hackathon demos. Click any framed object to open its details.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-2xl bg-neutral-100 p-3">
              <p className="text-neutral-500">Objects</p>
              <p className="text-lg font-semibold">{itemCount}</p>
            </div>
            <div className="rounded-2xl bg-neutral-100 p-3">
              <p className="text-neutral-500">Format</p>
              <p className="text-lg font-semibold">3D Room</p>
            </div>
            <div className="rounded-2xl bg-neutral-100 p-3">
              <p className="text-neutral-500">Interaction</p>
              <p className="text-lg font-semibold">Click</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function HeritageExhibitionApp() {
  const [selected, setSelected] = useState<ObjectItem | null>(null);
  const exhibitionItems = useMemo(() => objects.slice(0, 10), []);

  return (
    <div className="relative h-screen w-full bg-neutral-200">
      <IntroPanel itemCount={exhibitionItems.length} />
      <DetailsPanel item={selected} onClose={() => setSelected(null)} />

      <Canvas camera={{ position: [0, 1.5, 10], fov: 50 }}>
        <Room items={exhibitionItems} onSelect={setSelected} />
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={14}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 2.05}
          target={[0, 1.8, 0]}
        />
      </Canvas>

      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-sm text-neutral-700 shadow-lg backdrop-blur">
        Drag to rotate · Scroll to zoom · Click an object card to open details
      </div>
    </div>
  );
}
