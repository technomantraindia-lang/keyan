<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $categories = [
            'marine-ship-supply' => ['name' => 'Marine & Ship Supply', 'description' => 'Ship spares, deck hardware, valves, and essential vessel supplies.', 'image_path' => 'iamges/marine and shipping.png', 'sort_order' => 1],
            'fire-safety' => ['name' => 'Fire & Safety Equipment', 'description' => 'Certified firefighting and emergency response equipment.', 'image_path' => 'iamges/fire_safety.jpg', 'sort_order' => 2],
            'gas-detection' => ['name' => 'Gas Detection & Safety', 'description' => 'Portable and fixed systems for hazardous atmosphere monitoring.', 'image_path' => 'iamges/prod_gas_detector.jpg', 'sort_order' => 3],
            'industrial-machinery' => ['name' => 'Industrial Machinery & Tools', 'description' => 'Rugged machinery and tools for industrial and marine operations.', 'image_path' => 'iamges/industrial_automation.jpg', 'sort_order' => 4],
            'marine-instruments' => ['name' => 'Marine & Industrial Instruments', 'description' => 'Precision instruments and telemetry for critical operations.', 'image_path' => 'iamges/rig_instruments.jpg', 'sort_order' => 5],
        ];

        $categoryModels = collect($categories)->mapWithKeys(function (array $category, string $slug) {
            $record = Category::updateOrCreate(
                ['slug' => $slug],
                [...$category, 'is_active' => true]
            );

            return [$slug => $record];
        });

        $products = [
            ['catalog_id' => 'p1', 'sku' => 'KEY-GD-2500', 'category' => 'gas-detection', 'name' => 'Portable Multi Gas Detector X-am 2500', 'brand' => 'Drager', 'short_description' => 'Continuous detection of up to 4 gases with IP67 protection and ATEX certification.', 'specs' => 'O2, H2S, CO, Ex Gas Detection | IP67 Water Resistant', 'price_usd' => 485, 'availability' => 'In Stock', 'image_path' => 'iamges/prod_gas_detector.jpg', 'is_quote_only' => false],
            ['catalog_id' => 'p2', 'sku' => 'KEY-SCBA-300', 'category' => 'fire-safety', 'name' => 'SCBA Air Breathing Apparatus System', 'brand' => 'MSA Safety', 'short_description' => '300 Bar composite cylinder SCBA system with ergonomic harness and positive pressure mask.', 'specs' => '300 Bar Carbon Composite Cylinder | Ergonomic Harness', 'price_usd' => 1450, 'availability' => 'Available on Request', 'image_path' => 'iamges/prod_scba.jpg', 'is_quote_only' => false],
            ['catalog_id' => 'p3', 'sku' => 'KEY-PMP-200', 'category' => 'industrial-machinery', 'name' => 'Air-Operated Double Diaphragm Pump (AODD)', 'brand' => 'Wilden', 'short_description' => 'Heavy-duty pump for bilge transfer, chemical slurry, viscous fluids, and harsh marine environments.', 'specs' => 'Heavy-Duty Industrial Duty | 2 inch Flange Port', 'price_usd' => 890, 'availability' => 'In Stock', 'image_path' => 'iamges/prod_pump.jpg', 'is_quote_only' => false],
            ['catalog_id' => 'p4', 'sku' => 'KEY-VLV-100', 'category' => 'marine-ship-supply', 'name' => 'Marine Bronze Flanged Globe Valve DN100', 'brand' => 'Sikla / Marine Standard', 'short_description' => 'Class-approved bronze marine globe valve for seawater, cooling water, and fuel oil lines.', 'specs' => 'Class Approved | RG5 Bronze Marine Spec', 'price_usd' => 320, 'availability' => 'Available on Request', 'image_path' => 'iamges/prod_valve.jpg', 'is_quote_only' => false],
            ['catalog_id' => 'p5', 'sku' => 'KEY-TX-420', 'category' => 'marine-instruments', 'name' => 'Digital Marine Pressure Transmitter Gauge', 'brand' => 'Consilium / Nav-Tech', 'short_description' => 'ATEX Zone 0 pressure transmitter with 4-20mA HART output for rig depth and tank gauging.', 'specs' => 'ATEX Certified | 4-20mA Output | IP68 Submersible', 'price_usd' => 650, 'availability' => 'In Stock', 'image_path' => 'iamges/prod_transmitter.jpg', 'is_quote_only' => false],
            ['catalog_id' => 'p6', 'sku' => 'KEY-LJ-275', 'category' => 'marine-ship-supply', 'name' => 'SOLAS Approved Inflatable Life Jacket (275N)', 'brand' => 'Unitor / SOLAS', 'short_description' => 'Dual chamber automatic inflation life jacket with emergency light and whistle.', 'specs' => 'MED Certified | Dual Chamber Auto-Inflate 275N', 'price_usd' => 195, 'availability' => 'In Stock', 'image_path' => 'iamges/prod_lifejacket.jpg', 'is_quote_only' => false],
            ['catalog_id' => 'p7', 'sku' => 'KEY-FH-25', 'category' => 'fire-safety', 'name' => 'Heavy Duty Fire Hose & Couplings (2.5 inch)', 'brand' => 'Scott / Fire Guard', 'short_description' => 'Synthetic rubber lined high pressure fire hose with brass couplings.', 'specs' => 'Rubber Lined High Pressure Hose | 30m Length', 'price_usd' => 145, 'availability' => 'In Stock', 'image_path' => 'iamges/fire.png', 'is_quote_only' => false],
            ['catalog_id' => 'p8', 'sku' => 'KEY-RIG-88', 'category' => 'marine-instruments', 'name' => 'Offshore Rig Monitoring Control Telemetry', 'brand' => 'Apollo / Marine Instrumentation', 'short_description' => 'Integrated telemetry unit for rig depth, inclination, ballast pressure, and gas alarms.', 'specs' => 'Offshore Telemetry & Depth Gauge Unit | Modbus/Ethernet', 'price_usd' => 2850, 'availability' => 'Available on Request', 'image_path' => 'iamges/Offshore Rig Monitoring Control Telemetry.png', 'is_quote_only' => true],
        ];

        $productDetails = [
            'p1' => [
                'full_description' => 'The Drager X-am 2500 was developed for personal monitoring and reliably detects combustible gases, oxygen, carbon monoxide, nitrogen dioxide, sulfur dioxide, and hydrogen sulfide.',
                'specifications' => ['Product Type' => 'Portable Multi-Gas Detector', 'Model' => 'X-am 2500 Series', 'Target Gases' => 'O2, H2S, CO, Ex combustible vapors', 'Ingress Protection' => 'IP67 water and dust proof', 'Certification' => 'ATEX Zone 0/20 and MED SOLAS approved', 'Battery Life' => 'More than 12 hours continuous operation'],
                'applications' => ['Confined Space Entry', 'Shiphold Inspection', 'Refinery Turnaround', 'Offshore Rig Monitoring'],
                'gallery' => ['iamges/prod_gas_detector.jpg', 'iamges/prod_transmitter.jpg', 'iamges/rig_instruments.jpg'],
            ],
            'p2' => [
                'full_description' => 'Self-Contained Breathing Apparatus engineered for firefighting, marine vessel emergency response, and industrial chemical safety, with a lightweight 300 Bar composite cylinder.',
                'specifications' => ['Product Type' => 'Self-Contained Breathing Apparatus', 'Cylinder Rating' => '300 Bar working pressure', 'Cylinder Volume' => '6.8 Liter carbon composite', 'Face Mask' => 'Full-face positive-pressure silicone mask', 'Whistle Alarm' => 'Acoustic signal above 90 dB at 55 Bar', 'Certification' => 'EN 137 Type 2 and SOLAS/MED certified'],
                'applications' => ['Shipboard Firefighting', 'Chemical Plant Emergency', 'Industrial Rescue', 'Toxic Atmosphere Entry'],
                'gallery' => ['iamges/prod_scba.jpg', 'iamges/fire_safety.jpg', 'iamges/fire.png'],
            ],
            'p3' => [
                'full_description' => 'Wilden original air-operated double diaphragm pump designed for high-volume fluid transfer without electrical hazard, with self-priming and dry-run capabilities.',
                'specifications' => ['Product Type' => 'Double Diaphragm AODD Pump', 'Body Material' => 'Cast aluminum and ductile iron', 'Diaphragm Material' => 'Buna-N and Teflon PTFE', 'Port Diameter' => '2 inch ANSI flange', 'Max Flow Rate' => '617 L/min (163 GPM)', 'Air Supply Pressure' => '8.6 Bar (125 PSI)'],
                'applications' => ['Ship Bilge Pumping', 'Industrial Slurry Transfer', 'Chemical Transfer', 'Oil Spill Response'],
                'gallery' => ['iamges/prod_pump.jpg', 'iamges/INDUSTRIAL & MFG].png', 'iamges/consumables.jpg'],
            ],
            'p4' => [
                'full_description' => 'Heavy-duty cast bronze marine globe valve built to international SOLAS and classification society standards, resistant to seawater corrosion.',
                'specifications' => ['Product Type' => 'Flanged Marine Globe Valve', 'Nominal Size' => 'DN100 (4 inch)', 'Pressure Rating' => 'PN16 / 16 Bar', 'Material Body' => 'RG5 gunmetal bronze', 'Connection' => 'ANSI/DIN flanged standard', 'Class Certification' => "DNV-GL / Lloyd's Register"],
                'applications' => ['Seawater Cooling Lines', 'Fuel Oil Transfer', 'Ballast Piping', 'Shipboard Engine Room'],
                'gallery' => ['iamges/prod_valve.jpg', 'iamges/marine and shipping.png', 'iamges/ship_supplier.jpg'],
            ],
            'p5' => [
                'full_description' => 'High-precision marine pressure transmitter engineered for tank level measurement, pipeline pressure monitoring, and offshore platform telemetry.',
                'specifications' => ['Product Type' => 'Industrial Pressure Transmitter', 'Signal Output' => '4-20mA HART protocol', 'Pressure Range' => '0 to 40 Bar, customizable', 'Accuracy' => '+/-0.1% full scale', 'Explosion Proof' => 'ATEX Ex ia IIC T4 Ga', 'Housing' => '316L stainless steel / titanium'],
                'applications' => ['Offshore Tank Level', 'Cargo Pipeline Monitoring', 'Hydraulic System Control', 'Rig Telemetry'],
                'gallery' => ['iamges/prod_transmitter.jpg', 'iamges/rig_instruments.jpg', 'iamges/Offshore Rig Monitoring Control Telemetry.png'],
            ],
            'p6' => [
                'full_description' => 'Heavy-duty offshore life jacket engineered for heavy weather and industrial marine work, providing 275 Newtons of buoyancy to self-right an unconscious wearer.',
                'specifications' => ['Product Type' => 'Inflatable SOLAS Life Jacket', 'Buoyancy Rating' => '275 Newtons (ISO 12402-2)', 'Inflation Mechanism' => 'Automatic and manual', 'Chamber Setup' => 'Twin independent bladders', 'Light System' => 'MED approved self-igniting LED light', 'Certification' => 'SOLAS 74/96 and MED Wheelmark approved'],
                'applications' => ['Offshore Vessel Work', 'Ship Crew Safety', 'Pilot Transport', 'Rig Platform Operations'],
                'gallery' => ['iamges/prod_lifejacket.jpg', 'iamges/ship_supplier.jpg', 'iamges/offshore and rig.png'],
            ],
            'p7' => [
                'full_description' => 'Heavy-duty all-weather marine and industrial fire hose with synthetic polyester jacket and EPDM rubber lining, resistant to ozone, seawater, and chemical abrasion.',
                'specifications' => ['Product Type' => 'Industrial Fire Hose Assembly', 'Internal Diameter' => '2.5 inch (65mm)', 'Length' => '30 meter roll', 'Working Pressure' => '16 Bar (230 PSI)', 'Burst Pressure' => '48 Bar (690 PSI)', 'Coupling Type' => 'Instantaneous BS336 / Storz brass'],
                'applications' => ['Shipboard Hydrants', 'Industrial Plant Fire Protection', 'Refinery Safety Lines', 'Port Terminals'],
                'gallery' => ['iamges/fire.png', 'iamges/fire_safety.jpg', 'iamges/prod_scba.jpg'],
            ],
            'p8' => [
                'full_description' => 'Comprehensive rig control telemetry system engineered for jack-up rigs, drillships, and offshore platforms, centralizing multi-sensor signals into an ATEX-certified console.',
                'specifications' => ['Product Type' => 'Offshore Telemetry Control Unit', 'Display Interface' => '15 inch sunlight-readable touch console', 'Protocol' => 'Modbus TCP/IP, RS485, CANbus', 'Channels' => '32 analog and digital sensor inputs', 'Enclosure' => 'IP66 316 stainless steel console', 'Certification' => 'ATEX Zone 1 / DNV Offshore'],
                'applications' => ['Offshore Drilling Rigs', 'Jack-Up Platforms', 'FPSO Vessels', 'Subsea Telemetry'],
                'gallery' => ['iamges/Offshore Rig Monitoring Control Telemetry.png', 'iamges/rig_instruments.jpg', 'iamges/oil and gas.png'],
            ],
        ];

        foreach ($products as $product) {
            $slug = $product['category'];
            unset($product['category']);
            Product::updateOrCreate(
                ['catalog_id' => $product['catalog_id']],
                [...$product, ...($productDetails[$product['catalog_id']] ?? []), 'category_id' => $categoryModels->get($slug)->id, 'is_active' => true]
            );
        }

        User::updateOrCreate(
            ['email' => 'demo@keyancorporation.com'],
            ['name' => 'Keyan Demo Customer', 'company_name' => 'Keyan Corporation', 'account_type' => 'customer', 'password' => 'password123']
        );

        User::updateOrCreate(
            ['email' => 'admin@keyancorporation.com'],
            ['name' => 'Keyan Administrator', 'company_name' => 'Keyan Corporation', 'account_type' => 'admin', 'password' => 'admin123']
        );
    }
}
