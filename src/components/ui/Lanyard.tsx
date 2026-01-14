/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// Assets
import cardGLB from './card.glb';
import lanyard from './lanyard.png';
import idPhoto from './id_card.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }: { position?: [number, number, number], gravity?: [number, number, number], fov?: number, transparent?: boolean }) {
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/sequence');
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="lanyard-wrapper">
            <Canvas
                camera={{ position: position as any, fov: fov }}
                dpr={[1, isMobile ? 1.5 : 2]}
                gl={{ alpha: transparent }}
                onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
            >
                <ambientLight intensity={Math.PI} />
                <Physics gravity={gravity as any} timeStep={isMobile ? 1 / 30 : 1 / 60}>
                    <Suspense fallback={null}>
                        <Band isMobile={isMobile} onNavigate={handleNavigate} />
                    </Suspense>
                </Physics>
                <Environment blur={0.75}>
                    <Lightformer
                        intensity={2}
                        color="white"
                        position={[0, -1, 5]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[-1, -1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[1, 1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={10}
                        color="white"
                        position={[-10, 0, 14]}
                        rotation={[0, Math.PI / 2, Math.PI / 3]}
                        scale={[100, 10, 1]}
                    />
                </Environment>
            </Canvas>
        </div>
    );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, onNavigate }: { maxSpeed?: number, minSpeed?: number, isMobile?: boolean, onNavigate?: () => void }) {
    const band = useRef<any>(),
        fixed = useRef<any>(),
        j1 = useRef<any>(),
        j2 = useRef<any>(),
        j3 = useRef<any>(),
        card = useRef<any>(),
        navigated = useRef(false);
    const vec = useMemo(() => new THREE.Vector3(), []);
    const ang = useMemo(() => new THREE.Vector3(), []);
    const rot = useMemo(() => new THREE.Vector3(), []);
    const dir = useMemo(() => new THREE.Vector3(), []);

    const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 } as any;
    const { nodes, materials } = useGLTF(cardGLB) as any;
    const texture = useTexture(lanyard);
    const idTexture = useTexture(idPhoto); // Load the ID photo

    // Configure textures
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    // Flip the ID texture vertically if needed (common GLB/Texture issue), though React Fiber usually handles it.
    // Often GLTF textures are flipped. Let's try applying it directly.
    // Fix texture alignment - Flip vertical as requested
    idTexture.flipY = false;
    idTexture.center.set(0.5, 0.5);
    idTexture.rotation = 0;
    idTexture.repeat.set(1, 1);
    // Shift left slightly (~5px)
    idTexture.offset.set(0.015, 0);


    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
    );
    const [dragged, drag] = useState<THREE.Vector3 | false>(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.45, 0]
    ]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => void (document.body.style.cursor = 'auto');
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
        }
        if (fixed.current) {
            [j1, j2].forEach(ref => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                );
            });
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });

            // Check for hard pull
            // Debugging: Log y position if dragged
            if (dragged) {
                // console.log("Card Y:", card.current.translation().y);
            }

            // Lowered threshold to -2.5 for easier activation
            if (card.current && card.current.translation().y < -2.5 && !navigated.current) {
                console.log("Hard pull detected! Navigating...");
                navigated.current = true;
                onNavigate && onNavigate();
            }
        }
    });

    curve.curveType = 'chordal';

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group
                        scale={2.25}
                        position={[0, -1.2, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e: any) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
                        onPointerDown={(e: any) => (
                            e.target.setPointerCapture(e.pointerId),
                            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
                        )}
                    >
                        <mesh geometry={nodes.card.geometry}>
                            <meshPhysicalMaterial
                                clearcoat={isMobile ? 0 : 1}
                                clearcoatRoughness={0.15}
                                roughness={0.9}
                                metalness={0.8}
                                map={idTexture}
                            />
                        </mesh>
                        <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
                        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="white"
                    depthTest={false}
                    resolution={isMobile ? [1000, 2000] : [1000, 1000]}
                    useMap
                    map={texture}
                    repeat={[-4, 1]}
                    lineWidth={1}
                />
            </mesh>
        </>
    );
}
