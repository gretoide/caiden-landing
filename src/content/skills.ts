export type SkillItem = string;

export const TECHNICAL_SKILLS: Record<string, SkillItem[]> = {
  fabrication: [
    'Fiberglass',
    'Resin casting & mold making',
    'Foam crafting',
    'Polyurethane',
    'Polyethylene',
    'Silicone rubber molds',
    'Thermoforming materials',
    'Wood',
    'Impresión 3D',
    'Professional handheld power tools',
  ],
  finishing: ['Painting & airbrushing', 'Weathering', 'SFX', 'Sculpting', 'LED design', 'Electronics'],
  digital: ['3D Design (Blender)', '3D Printing', 'Drawing'],
};

export type ExpandableSkill = {
  id: string;
  category: 'Fabrication' | 'Finishing & FX' | 'Digital';
  title: string;
  description: string;
  publicId?: string;
  tags: string[];
};

export const ALL_SKILLS: ExpandableSkill[] = [
  {
    id: 'fiberglass-foam',
    category: 'Fabrication',
    title: 'Fiberglass & Foam Crafting',
    description:
      'Expert structural and lightweight builds using high-durability fiberglass layering and precise foam carving for base armor and realistic textures.',
    tags: ['Fiberglass', 'Foam Crafting', 'Polyurethane', 'Polyethylene', 'Thermoforming'],
    publicId: 'chainsaw_1_azfqly',
  },
  {
    id: 'mold-making',
    category: 'Fabrication',
    title: 'Resin Casting & Mold Making',
    description: 'Precision silicone rubber molds designed for replicating highly detailed, complex parts in specialized resins.',
    tags: ['Silicone Rubber Molds', 'Resin Casting', 'Translucent Resins'],
  },
  {
    id: 'wood-working',
    category: 'Fabrication',
    title: 'Traditional Woodworking',
    description: 'Classic and modern woodworking techniques combining structural integrity with organic, hand-carved finishing touches.',
    tags: ['Wood', 'Handheld Power Tools', 'CNC Preparation'],
    publicId: 'wp_god_of_war_5_shbod3',
  },
  {
    id: 'painting',
    category: 'Finishing & FX',
    title: 'Painting & Weathering',
    description:
      'Master-level painting, airbrushing, and layered weathering to simulate organic decay, oxidized metals, and true-to-life battle damage.',
    tags: ['Airbrushing', 'Weathering', 'Metallic Finishes'],
    publicId: 'skyrim_1_llcbuo',
  },
  {
    id: 'sfx-prosthetics',
    category: 'Finishing & FX',
    title: 'SFX & Prosthetics',
    description: 'Creation of hyper-realistic silicone appliances, dental acrylics, and encapsulated FX makeup for high-end creature design.',
    tags: ['SFX', 'Silicone Appliances', 'Translucent Layering'],
    publicId: 'got_1_otuw4y',
  },
  {
    id: 'sculpting',
    category: 'Finishing & FX',
    title: 'Hand Sculpting',
    description: 'Traditional analog sculpting for highly detailed statues and complex organic shapes prior to molding.',
    tags: ['Sculpting', 'Clay', 'Organic Textures'],
  },
  {
    id: 'led-electronics',
    category: 'Finishing & FX',
    title: 'LED Design & Electronics',
    description: 'Integrated logic powered by Arduino, custom PCBs, motorized movement, and programmed RGB lighting for interactive props.',
    tags: ['LED design', 'Electronics', 'Arduino', 'Motors'],
    publicId: 'wp_al_hacha_1_citmzg',
  },
  {
    id: '3d-design',
    category: 'Digital',
    title: '3D Design & Modeling',
    description: 'Advanced 3D modeling and specialized drafting to prepare precise, scale-accurate files for digital manufacturing.',
    tags: ['3D Design', 'Blender', 'CAD'],
  },
  {
    id: '3d-printing',
    category: 'Digital',
    title: 'Additive Manufacturing',
    description: 'High-fidelity 3D printing across multiple resin and filament materials to achieve complex architectural bases.',
    tags: ['3D Printing', 'SLA Resin', 'FDM'],
  },
];

