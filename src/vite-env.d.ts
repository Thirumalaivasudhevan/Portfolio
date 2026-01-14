/// <reference types="vite/client" />

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
    export const MeshLineGeometry: any;
    export const MeshLineMaterial: any;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: any
            meshLineMaterial: any
        }
    }
}

// Extend ThreeElements for R3F v8+
import { Object3DNode } from '@react-three/fiber'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>
        meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>
    }
}
