"use client";

import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";

// Enhanced data center information
const locations = [
  { 
    id: 1, 
    region: "us-east-1", 
    name: "N. Virginia", 
    lat: 37.926868, 
    lng: -78.024902,
    provider: "AWS",
    specs: "A100, V100, T4 GPUs"
  },
  { 
    id: 2, 
    region: "eu-west-1", 
    name: "Ireland", 
    lat: 53.142367, 
    lng: -7.692054,
    provider: "AWS",
    specs: "A100, T4 GPUs"
  },
  { 
    id: 3, 
    region: "ap-northeast-1", 
    name: "Tokyo", 
    lat: 35.689487, 
    lng: 139.691711,
    provider: "AWS",
    specs: "V100, T4 GPUs"
  },
  { 
    id: 4, 
    region: "us-west-2", 
    name: "Oregon", 
    lat: 43.804133, 
    lng: -120.554871,
    provider: "GCP",
    specs: "A100, T4 GPUs"
  },
  { 
    id: 5, 
    region: "ap-southeast-1", 
    name: "Singapore", 
    lat: 1.352083, 
    lng: 103.819836,
    provider: "AWS",
    specs: "V100, T4 GPUs"
  },
  { 
    id: 6, 
    region: "eu-central-1", 
    name: "Frankfurt", 
    lat: 50.110922, 
    lng: 8.682127,
    provider: "AWS",
    specs: "A100, V100 GPUs"
  },
  { 
    id: 7, 
    region: "af-south-1", 
    name: "Cape Town", 
    lat: -33.924870, 
    lng: 18.424055,
    provider: "AWS",
    specs: "V100, T4 GPUs"
  },
  { 
    id: 8, 
    region: "sa-east-1", 
    name: "São Paulo", 
    lat: -23.550520, 
    lng: -46.633308,
    provider: "AWS",
    specs: "A100, T4 GPUs"
  },
  { 
    id: 9, 
    region: "ap-southeast-2", 
    name: "Sydney", 
    lat: -33.868820, 
    lng: 151.209290,
    provider: "AWS",
    specs: "V100, T4 GPUs"
  },
  { 
    id: 10, 
    region: "ap-south-1", 
    name: "Mumbai", 
    lat: 19.075984, 
    lng: 72.877656,
    provider: "GCP",
    specs: "A100, V100 GPUs"
  },
  { 
    id: 11, 
    region: "me-south-1", 
    name: "Dubai", 
    lat: 25.276987, 
    lng: 55.296249,
    provider: "AWS",
    specs: "T4 GPUs"
  },
  { 
    id: 12, 
    region: "ap-east-1", 
    name: "Hong Kong", 
    lat: 22.396428, 
    lng: 114.109497,
    provider: "AWS",
    specs: "A100, V100 GPUs"
  }
];

const getData = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"
  );
  return res.json();
};

const GlobeComponent = () => {
  let Globe = () => null;
  if (typeof window !== "undefined") Globe = require("react-globe.gl").default;

  const globeEl = useRef(null);
  const [hexData, setHexData] = useState([]);
  const [hoverData, setHoverData] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [activeArcs, setActiveArcs] = useState([]);
  const [rings, setRings] = useState([]);

  // Load geographical data
  useEffect(() => {
    getData().then((geoData) => {
      setHexData(geoData.features);
    });
  }, []);

  // Handle responsive dimensions
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        } else {
          const containerWidth = window.innerWidth * 0.5;
          const containerHeight = window.innerHeight;
          const size = Math.min(containerWidth * 0.9, containerHeight * 0.9);
          setDimensions({
            width: size,
            height: size,
          });
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Enhanced arc animation system
  useEffect(() => {
    const NUM_ARCS = 3; // Number of simultaneous arcs
    const ARC_DURATION = 4000; // Duration for one arc animation (ms)

    const getRandomLocation = (exclude = []) => {
      const available = locations.filter(loc => !exclude.some(ex => ex.id === loc.id));
      return available[Math.floor(Math.random() * available.length)];
    };

    const createArc = (start, end) => ({
      startLat: start.lat,
      startLng: start.lng,
      endLat: end.lat,
      endLng: end.lng,
      color: "rgba(163, 230, 53, 0.5)",
      altitude: 0.3, // Add a fixed altitude for better visibility
    });

    let animationFrameId;
    const updateArcs = () => {
      // Create new arcs when needed
      setActiveArcs(prevArcs => {
        if (prevArcs.length < NUM_ARCS) {
          const usedLocations = prevArcs.map(arc => ({
            id: locations.find(loc => loc.lat === arc.endLat && loc.lng === arc.endLng)?.id
          }));
          
          const start = getRandomLocation(usedLocations);
          const end = getRandomLocation([start, ...usedLocations]);
          
          return [...prevArcs, createArc(start, end)];
        }
        return prevArcs;
      });

      // Schedule next update
      animationFrameId = requestAnimationFrame(updateArcs);
    };

    // Initialize first arcs
    const initialArcs = [];
    for (let i = 0; i < NUM_ARCS; i++) {
      const start = getRandomLocation(initialArcs.map(arc => ({
        id: locations.find(loc => loc.lat === arc.endLat && loc.lng === arc.endLng)?.id
      })));
      const end = getRandomLocation([start]);
      initialArcs.push(createArc(start, end));
    }
    setActiveArcs(initialArcs);

    // Start animation loop
    animationFrameId = requestAnimationFrame(updateArcs);

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Enhanced ring animation with larger waves
  useEffect(() => {
    const baseRings = locations.map(loc => ({
      lat: loc.lat,
      lng: loc.lng,
      maxRadius: 3.5,  // Increased from 2 to 3.5
      propagationSpeed: 2, // Increased from 1 to 2
      repeatPeriod: 2500, // Adjusted timing
    }));

    // Create layered rings effect with larger waves
    const layeredRings = [
      ...baseRings,
      ...baseRings.map(ring => ({
        ...ring,
        maxRadius: ring.maxRadius * 0.6,  // Slightly adjusted ratio
        repeatPeriod: ring.repeatPeriod * 1.2,  // Adjusted timing
        propagationSpeed: ring.propagationSpeed * 1.1,  // Slightly faster
      }))
    ];

    setRings(layeredRings);
  }, []);

  // Camera and controls setup with hover interaction
  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      const camera = globeEl.current.camera();
      
      const isMobile = window.innerWidth < 1024;
      camera.position.set(isMobile ? 350 : 300, 0, 0);
      
      controls.enableZoom = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.rotateSpeed = 0.8;
      controls.minDistance = isMobile ? 250 : 200;
      controls.maxDistance = isMobile ? 450 : 400;
      
      // Add event listeners for hover interaction
      const canvasElement = globeEl.current.renderer().domElement;
      
      const handleMouseEnter = () => {
        controls.autoRotate = false;
      };
      
      const handleMouseLeave = () => {
        controls.autoRotate = true;
      };
      
      canvasElement.addEventListener('mouseenter', handleMouseEnter);
      canvasElement.addEventListener('mouseleave', handleMouseLeave);
      
      controls.update();

      // Cleanup event listeners
      return () => {
        canvasElement.removeEventListener('mouseenter', handleMouseEnter);
        canvasElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  // Update the globe material with a more sophisticated look
  const globeMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a1a1a, // Darker base color
    transparent: true,
    opacity: 0.9,
    shininess: 0.7, // Add some shine
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        {/* Enhanced Tooltip */}
        <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block">
          {hoverData && (
            <div 
              className="absolute z-50 bg-background-elevated-dark/95 backdrop-blur-sm border border-lime-400/20 rounded-lg p-4 text-white shadow-xl"
              style={{
                left: `${dimensions.width / 2}px`,
                top: `${dimensions.height / 2}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="font-mono">
                <div className="font-bold text-lime-400">{hoverData.name}</div>
                <div className="text-sm opacity-80">
                  <span className="text-lime-400/80">{hoverData.provider}</span>
                  <span className="mx-2 text-lime-400/30">|</span>
                  <span>{hoverData.region}</span>
                </div>
                <div className="text-xs mt-1 text-lime-400/60">
                  Available: {hoverData.specs}
                </div>
              </div>
            </div>
          )}
        </div>

        <Globe
          ref={globeEl}
          width={dimensions.width}
          height={dimensions.height}
          globeMaterial={globeMaterial}
          hexPolygonsData={hexData}
          hexPolygonResolution={3}
          hexPolygonMargin={0.3}
          hexPolygonUseDots={true}
          hexPolygonColor={() => "rgba(163, 230, 53, 0.15)"} // Slightly brighter hex colors
          arcsData={activeArcs}
          arcColor={() => "rgba(163, 230, 53, 0.6)"} // Brighter arcs
          arcStroke={0.85} // Slightly thicker arcs
          arcDashLength={() => 0.6}
          arcDashGap={() => 0.15}
          arcDashAnimateTime={1000}
          arcAltitude="altitude"
          arcsTransitionDuration={0}
          arcAltitudeAutoScale={0.3}
          ringsData={rings}
          ringColor={() => "rgba(163, 230, 53, 0.4)"} // Brighter rings
          ringMaxRadius="maxRadius"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          ringAltitude={0.001}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere={true} // Enable atmosphere
          atmosphereColor="rgba(163, 230, 53, 0.1)" // Subtle lime atmosphere
          atmosphereAltitude={0.1} // Thin atmosphere layer
          showGlobe={true}
          pointsData={locations}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => "#84cc16"} // Brighter points
          pointAltitude={0.02}
          pointRadius={window.innerWidth < 1024 ? 1.4 : 1.7} // Slightly larger points
          pointsMerge={false}
          onPointHover={setHoverData}
          labelsData={locations}
          labelLat="lat"
          labelLng="lng"
          labelAltitude={0.01}
          labelText="name"
          labelSize={1.2}
          labelDotRadius={0.3}
          labelColor={() => "#84cc16"}
          labelResolution={2}
          labelIncludeDot={true}
          labelDotOrientation={() => 'right'}
          labelLabel={null}
        />
      </div>
    </div>
  );
};

export default GlobeComponent; 