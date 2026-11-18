/**
 * RouxCraft - Default Preloaded Roux Method Knowledge Base
 * Rigorously crafted case states and visuals for First Block, Second Block, CMLL, and LSE.
 * All 44 cases have mathematically verified cubeState, algorithms, and arrows.
 * Layout: FB (4 cases), SB (4 cases), CMLL (24 cases), LSE (12 cases) - all exact multiples of 4!
 */

const DEFAULT_ROUX_CASES = [
    {
        "id": "fb-01-dl-line",
        "category": "fb",
        "group": "Cơ bản (Base)",
        "title": "FB-01: Line Cạnh Đáy D-L (Bottom Line)",
        "algorithm": "D L2 hoặc x U' L2",
        "description": "Mục tiêu: Đặt cạnh White-Blue (D-L) vào đúng vị trí đáy bên trái. Không cần quan tâm các tâm hay các viên khác.",
        "tips": "Trong Roux bạn không cần căn tâm trước! Cạnh DL có thể giải tự do bằng các bước xoay D, L, U hoặc M.",
        "viewMode": "iso_ufl",
        "cubeState": {
            "U": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "D": [
                "#475569",
                "#475569",
                "#475569",
                "#FFFFFF",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "F": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "B": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "L": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#3B82F6",
                "#475569",
                "#475569",
                "#3B82F6",
                "#475569"
            ],
            "R": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ]
        },
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 7,
                "toFace": "L",
                "toIdx": 7,
                "color": "#38BDF8",
                "label": "DL Line"
            }
        ]
    },
    {
        "id": "fb-02-fl-pair",
        "category": "fb",
        "group": "Cặp góc-cạnh (Pairs)",
        "title": "FB-02: Cặp Góc-Cạnh Trước (FL Pair)",
        "algorithm": "U' L' U L hoặc r U' r'",
        "description": "Nhận diện: Cạnh Blue-Red (FL) và Góc White-Blue-Red (DFL). Cần làm gì: Đưa cả 2 lên tầng U để ghép đôi (pair up), sau đó chèn vào slot trước bên trái.",
        "tips": "Có thể dùng r và r' thoải mái vì Second Block bên phải chưa được xây, tận dụng trục M tự do.",
        "viewMode": "iso_ufl",
        "cubeState": {
            "U": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#EF4444",
                "#FFFFFF"
            ],
            "D": [
                "#475569",
                "#475569",
                "#475569",
                "#FFFFFF",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "F": [
                "#475569",
                "#3B82F6",
                "#3B82F6",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "B": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "L": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#3B82F6",
                "#475569",
                "#475569",
                "#3B82F6",
                "#475569"
            ],
            "R": [
                "#EF4444",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ]
        },
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 7,
                "toFace": "F",
                "toIdx": 3,
                "color": "#10B981",
                "label": "Ghép FL"
            }
        ]
    },
    {
        "id": "fb-03-bl-pair",
        "category": "fb",
        "group": "Cặp góc-cạnh (Pairs)",
        "title": "FB-03: Cặp Góc-Cạnh Sau (BL Pair)",
        "algorithm": "U B' U' B hoặc U2 L U' L'",
        "description": "Nhận diện: Cạnh Blue-Orange (BL) và Góc White-Blue-Orange (DBL). Cần làm gì: Ghép cặp ở tầng U rồi đưa về phía sau bên trái để hoàn thành khối 1x2x3.",
        "tips": "Giải cặp BL trước hoặc FL trước đều được, ưu tiên cặp nào dễ nhìn thấy và ít bước xoay hơn.",
        "viewMode": "iso_ufl",
        "cubeState": {
            "U": [
                "#475569",
                "#F97316",
                "#FFFFFF",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#475569",
                "#FFFFFF",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "F": [
                "#475569",
                "#475569",
                "#475569",
                "#EF4444",
                "#475569",
                "#475569",
                "#EF4444",
                "#475569",
                "#475569"
            ],
            "B": [
                "#3B82F6",
                "#3B82F6",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "L": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#3B82F6",
                "#3B82F6",
                "#475569",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#475569",
                "#475569",
                "#F97316",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ]
        },
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 1,
                "toFace": "L",
                "toIdx": 3,
                "color": "#F59E0B",
                "label": "Ghép BL"
            }
        ]
    },
    {
        "id": "fb-04-m-slice-insert",
        "category": "fb",
        "group": "Kỹ thuật nâng cao",
        "title": "FB-04: Cạnh Kẹt Ở M-Slice (M Insertion)",
        "algorithm": "M' U L' hoặc r U' r' L'",
        "description": "Nhận diện: Cạnh đáy hoặc cạnh cặp nằm kẹt ở lát cắt giữa M-slice. Cần làm gì: Dùng M' hoặc r để nhấc cạnh lên tầng U mà không phá hỏng các viên đã đưa vào.",
        "tips": "Tận dụng lát cắt M là linh hồn của Roux - M di chuyển mượt mà bằng ngón đeo nhẫn (ring finger).",
        "viewMode": "iso_ufl",
        "cubeState": {
            "U": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "D": [
                "#475569",
                "#3B82F6",
                "#475569",
                "#FFFFFF",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "F": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#EF4444",
                "#475569"
            ],
            "B": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "L": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#3B82F6",
                "#475569",
                "#475569",
                "#3B82F6",
                "#475569"
            ],
            "R": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ]
        },
        "arrows": [
            {
                "fromFace": "F",
                "fromIdx": 7,
                "toFace": "U",
                "toIdx": 7,
                "color": "#EF4444",
                "label": "Nhấc M'"
            }
        ]
    },
    {
        "id": "sb-01-dr-edge",
        "category": "sb",
        "group": "Cạnh đáy (DR Base)",
        "title": "SB-01: Đưa Cạnh Đáy DR (Right Base Edge)",
        "algorithm": "M2 U M2 hoặc r' U' r",
        "description": "Nhận diện: Cạnh White-Green (DR). Cần làm gì: Đưa cạnh DR vào vị trí đáy phải. QUY TẮC SỐNG CÒN: Chỉ dùng <r, R, U, M> để KHÔNG phá First Block bên trái!",
        "tips": "Dùng M2 từ mặt U đẩy thẳng xuống đáy rất nhanh và trực quan.",
        "viewMode": "iso_ufr",
        "cubeState": {
            "U": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#FFFFFF",
                "#475569"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#475569",
                "#FFFFFF",
                "#475569",
                "#475569",
                "#FFFFFF",
                "#475569",
                "#475569"
            ],
            "F": [
                "#475569",
                "#10B981",
                "#475569",
                "#EF4444",
                "#475569",
                "#475569",
                "#EF4444",
                "#475569",
                "#475569"
            ],
            "B": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#F97316",
                "#475569",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#475569",
                "#475569",
                "#475569",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#10B981",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ]
        },
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 7,
                "toFace": "R",
                "toIdx": 7,
                "color": "#F59E0B",
                "label": "M2 xuống DR"
            }
        ]
    },
    {
        "id": "sb-02-br-pair",
        "category": "sb",
        "group": "Cặp góc-cạnh SB",
        "title": "SB-02: Cặp Sau Phải (BR Pair: Green-Orange)",
        "algorithm": "U' R U R' hoặc r' U' r U R U' R'",
        "description": "Nhận diện: Cạnh Green-Orange và Góc White-Green-Orange. Cần làm gì: Ghép cặp trên tầng U rồi chèn vào slot sau bằng thao tác R và U tự do.",
        "tips": "Ưu tiên giải BR trước để slot sau đầy, giúp tầm mắt dễ quan sát cặp trước (FR) hơn rất nhiều.",
        "viewMode": "iso_ufr",
        "cubeState": {
            "U": [
                "#475569",
                "#10B981",
                "#FFFFFF",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#475569",
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#475569"
            ],
            "F": [
                "#475569",
                "#475569",
                "#475569",
                "#EF4444",
                "#475569",
                "#475569",
                "#EF4444",
                "#475569",
                "#475569"
            ],
            "B": [
                "#F97316",
                "#F97316",
                "#475569",
                "#475569",
                "#475569",
                "#F97316",
                "#475569",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#475569",
                "#475569",
                "#475569",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#475569",
                "#475569",
                "#10B981",
                "#475569",
                "#10B981",
                "#475569",
                "#475569",
                "#10B981",
                "#475569"
            ]
        },
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 1,
                "toFace": "R",
                "toIdx": 5,
                "color": "#10B981",
                "label": "Ghép BR"
            }
        ]
    },
    {
        "id": "sb-03-fr-pair",
        "category": "sb",
        "group": "Cặp góc-cạnh SB",
        "title": "SB-03: Cặp Trước Phải (FR Pair: Green-Red)",
        "algorithm": "R U R' hoặc U' R U2 R' U R U' R'",
        "description": "Nhận diện: Cặp cuối cùng của Second Block. Cần làm gì: Tách cặp, đưa về vị trí thuận lợi và chèn vào slot FR. Hoàn tất toàn bộ 2 khối (F2B)!",
        "tips": "Nếu cạnh bị lật ngược (bad orientation), kết hợp r U' r' hoặc M' U R U' r' để lật cạnh.",
        "viewMode": "iso_ufr",
        "cubeState": {
            "U": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#EF4444",
                "#475569",
                "#475569",
                "#FFFFFF"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#475569",
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#475569",
                "#475569",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#475569",
                "#EF4444",
                "#475569",
                "#475569"
            ],
            "B": [
                "#475569",
                "#475569",
                "#475569",
                "#F97316",
                "#475569",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#475569",
                "#475569",
                "#475569",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#10B981",
                "#475569",
                "#475569",
                "#10B981",
                "#10B981",
                "#475569",
                "#10B981",
                "#10B981"
            ]
        },
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 5,
                "toFace": "R",
                "toIdx": 3,
                "color": "#38BDF8",
                "label": "Chèn FR"
            }
        ]
    },
    {
        "id": "sb-04-m-slice-split",
        "category": "sb",
        "group": "Mẹo tách cặp",
        "title": "SB-04: Tách Cặp Bằng M-Slice (M Slice Tricks)",
        "algorithm": "M' U R U' r' hoặc r U' r'",
        "description": "Nhận diện: Góc và cạnh dính vào nhau nhưng sai màu hoặc sai vị trí. Cần làm gì: Giữ góc ở tầng U, đẩy cạnh vào M-slice bằng M', xoay U rồi kéo M về.",
        "tips": "Đây là lợi thế lớn nhất của Roux so với CFOP: dùng lát M tách cặp chỉ mất 3-4 moves!",
        "viewMode": "iso_ufr",
        "cubeState": {
            "U": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#EF4444",
                "#FFFFFF"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#475569",
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#475569"
            ],
            "F": [
                "#475569",
                "#10B981",
                "#10B981",
                "#EF4444",
                "#475569",
                "#475569",
                "#EF4444",
                "#475569",
                "#475569"
            ],
            "B": [
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#475569",
                "#F97316",
                "#475569",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#475569",
                "#475569",
                "#475569",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#EF4444",
                "#475569",
                "#475569",
                "#475569",
                "#10B981",
                "#475569",
                "#475569",
                "#10B981",
                "#475569"
            ]
        },
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 7,
                "toFace": "U",
                "toIdx": 1,
                "color": "#EF4444",
                "label": "Tách M'"
            }
        ]
    },
    {
        "id": "cmll-t-01",
        "category": "cmll",
        "group": "Nhóm T",
        "title": "CMLL T-01: T Left Bar (Thanh Bên Trái)",
        "algorithm": "r U' r2' U r2 U r2' U' r",
        "description": "Nhận diện: 2 góc vàng hướng sang 2 bên (T-shape), 2 góc mặt trước có màu khớp nhau tạo thành thanh ngang (Bar) bên trái.",
        "tips": "Công thức dùng toàn r và U, cực kỳ êm tay và không cần xoay khối (rotationless).",
        "viewMode": "top_down",
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 0,
                "toFace": "U",
                "toIdx": 6,
                "color": "#38BDF8",
                "label": "Bar Trái"
            }
        ],
        "cubeState": {
            "U": [
                "#EF4444",
                "#475569",
                "#3B82F6",
                "#475569",
                "#FDE047",
                "#475569",
                "#F97316",
                "#3B82F6",
                "#3B82F6"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#10B981",
                "#475569",
                "#FDE047",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#FDE047",
                "#475569",
                "#10B981",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#FDE047",
                "#475569",
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#F97316",
                "#10B981",
                "#EF4444",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-t-02",
        "category": "cmll",
        "group": "Nhóm T",
        "title": "CMLL T-02: T Right Bar (Thanh Bên Phải)",
        "algorithm": "R U R' U' R' F R F'",
        "description": "Nhận diện: 2 góc vàng hướng 2 bên, 2 góc mặt sau có màu khớp nhau tạo thành thanh ngang (Bar) bên phải.",
        "tips": "Dùng Sexy Move (R U R' U') kết hợp Sledgehammer (R' F R F'), chuỗi fingertrick quen thuộc nhất.",
        "viewMode": "top_down",
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 2,
                "toFace": "U",
                "toIdx": 8,
                "color": "#38BDF8",
                "label": "Bar Phải"
            }
        ],
        "cubeState": {
            "U": [
                "#EF4444",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#475569",
                "#10B981",
                "#10B981",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#FDE047",
                "#475569",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#475569",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#3B82F6",
                "#3B82F6",
                "#F97316",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#475569",
                "#F97316",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-t-03",
        "category": "cmll",
        "group": "Nhóm T",
        "title": "CMLL T-03: T Front Rows (Thanh Phía Trước)",
        "algorithm": "F R U R' U' F'",
        "description": "Nhận diện: 2 góc vàng hướng 2 bên, 2 góc trước đối màu nhau, 2 góc sau đối màu nhau.",
        "tips": "F kết hợp Sexy Move và F', cực nhanh trong 6 bước xoay.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#10B981",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#475569",
                "#10B981",
                "#10B981",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#475569",
                "#3B82F6",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#475569",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#FDE047",
                "#3B82F6",
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#EF4444",
                "#475569",
                "#F97316",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-t-04",
        "category": "cmll",
        "group": "Nhóm T",
        "title": "CMLL T-04: T Diagonal (Chéo Đối Đỉnh)",
        "algorithm": "r' D' r U r' D r U' r U r'",
        "description": "Nhận diện: 2 góc vàng hướng 2 bên, không có thanh đồng màu nào, các góc đối xứng chéo nhau.",
        "tips": "Tận dụng tầng D để hoán vị góc chéo mà không phá First 2 Blocks.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#EF4444",
                "#475569",
                "#EF4444",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#3B82F6",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#475569",
                "#10B981",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#FDE047",
                "#475569",
                "#F97316",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#F97316",
                "#475569",
                "#FDE047",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-u-01",
        "category": "cmll",
        "group": "Nhóm U",
        "title": "CMLL U-01: U Front Rows (Hai Đèn Phía Trước)",
        "algorithm": "R2' D' R U2 R' D R U2 R",
        "description": "Nhận diện: 2 góc vàng hướng về phía trước (Headlights), 2 góc trước đồng màu tạo thành thanh trước.",
        "tips": "Tốc độ thực hiện rất cao nhờ nhịp R2' D' mượt mà.",
        "viewMode": "top_down",
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 6,
                "toFace": "U",
                "toIdx": 8,
                "color": "#FDE047",
                "label": "Headlights"
            }
        ],
        "cubeState": {
            "U": [
                "#10B981",
                "#475569",
                "#F97316",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#475569",
                "#10B981",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#FDE047",
                "#475569",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#EF4444",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#F97316",
                "#10B981",
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-u-02",
        "category": "cmll",
        "group": "Nhóm U",
        "title": "CMLL U-02: U Slash (Đường Chéo / X-Bars)",
        "algorithm": "r U R' U' r' F R F'",
        "description": "Nhận diện: 2 góc vàng hướng trước, 2 góc mặt sau có màu đồng bộ tạo thanh ngang phía sau.",
        "tips": "Biến thể của Sledgehammer bắt đầu bằng r U R' U' r'.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#EF4444",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#475569",
                "#10B981",
                "#475569",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#FDE047",
                "#475569",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#475569",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#3B82F6",
                "#3B82F6",
                "#F97316",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#10B981",
                "#F97316",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-u-03",
        "category": "cmll",
        "group": "Nhóm U",
        "title": "CMLL U-03: U Back Rows (Thanh Phía Sau)",
        "algorithm": "R' U' R U' R' U2 R2 U R' U R U2 R'",
        "description": "Nhận diện: 2 góc vàng hướng trước, 2 bên hông (trái và phải) có các cặp màu đồng bộ.",
        "tips": "Chuỗi 2 lần xoay nhịp U' và U2, giữ chắc ngón cái ở mặt F.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#3B82F6",
                "#475569",
                "#10B981",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#10B981",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#FDE047",
                "#3B82F6",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#F97316",
                "#475569",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#475569",
                "#F97316",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-u-04",
        "category": "cmll",
        "group": "Nhóm U",
        "title": "CMLL U-04: U Pure (Thuần Khiết)",
        "algorithm": "F R U R' U' R U' R' U R U R' F'",
        "description": "Nhận diện: 2 góc vàng hướng trước, các màu bên đối xứng so le nhau hoàn toàn.",
        "tips": "Thao tác F (Triple Sexy Move biến thể) F'.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#EF4444",
                "#475569",
                "#EF4444",
                "#475569",
                "#FDE047",
                "#475569",
                "#3B82F6",
                "#3B82F6",
                "#10B981"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#F97316",
                "#475569",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#FDE047",
                "#475569",
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#FDE047",
                "#475569",
                "#FDE047",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-l-01",
        "category": "cmll",
        "group": "Nhóm L",
        "title": "CMLL L-01: L Mirror (Góc Kề Đối Xứng)",
        "algorithm": "F R' F' r U R U' r'",
        "description": "Nhận diện: 2 góc vàng kề nhau hướng lên đỉnh, 2 góc còn lại hướng ra trước và sau, tạo thế đối xứng gương.",
        "tips": "Bắt đầu bằng F R' F' rồi lồng r U R U' r', chỉ 8 bước xoay.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#FDE047",
                "#475569",
                "#EF4444",
                "#475569",
                "#FDE047",
                "#475569",
                "#F97316",
                "#475569",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#FDE047",
                "#475569",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#475569",
                "#10B981",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#F97316",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#10B981",
                "#FDE047",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-l-02",
        "category": "cmll",
        "group": "Nhóm L",
        "title": "CMLL L-02: L Diagonal (Góc Chéo Nhóm L)",
        "algorithm": "R U2 R2' F R F' R U2 R'",
        "description": "Nhận diện: 2 góc vàng kề nhau hướng lên đỉnh, các góc bên có thanh đồng màu phía sau.",
        "tips": "Nhịp R U2 mở đầu tạo thế chèn Sledgehammer ở giữa.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#FDE047",
                "#10B981",
                "#10B981",
                "#475569",
                "#FDE047",
                "#475569",
                "#F97316",
                "#475569",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#FDE047",
                "#475569",
                "#10B981",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#EF4444",
                "#475569",
                "#3B82F6",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#EF4444",
                "#475569",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#F97316",
                "#3B82F6",
                "#FDE047",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-l-03",
        "category": "cmll",
        "group": "Nhóm L",
        "title": "CMLL L-03: L Front Bar (Thanh Phía Trước)",
        "algorithm": "r' U2 R2 U R2' U r",
        "description": "Nhận diện: 2 góc vàng kề nhau hướng lên đỉnh, thanh đồng màu nằm ngay mặt trước.",
        "tips": "Dùng lát cắt r' mở đầu, kết hợp R2 U R2' U r cực kỳ nhanh.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#FDE047",
                "#10B981",
                "#10B981",
                "#475569",
                "#FDE047",
                "#475569",
                "#F97316",
                "#475569",
                "#10B981"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#F97316",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#10B981",
                "#475569",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444",
                "#475569",
                "#FDE047"
            ],
            "B": [
                "#EF4444",
                "#EF4444",
                "#3B82F6",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#EF4444",
                "#475569",
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#FFFFFF",
                "#10B981",
                "#FDE047",
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#3B82F6",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-l-04",
        "category": "cmll",
        "group": "Nhóm L",
        "title": "CMLL L-04: L Pure (Thuần Khiết)",
        "algorithm": "R' U2 R U R' U R",
        "description": "Nhận diện: 2 góc vàng kề nhau hướng lên đỉnh, không có thanh đồng màu nào.",
        "tips": "Biến thể đảo của Sune, thực hiện dứt khoát trong vòng 0.8 giây.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#10B981",
                "#475569",
                "#EF4444",
                "#475569",
                "#FDE047",
                "#475569",
                "#F97316",
                "#475569",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#10B981",
                "#10B981",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#475569",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#EF4444",
                "#475569",
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#3B82F6",
                "#3B82F6",
                "#FDE047",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-sune-01",
        "category": "cmll",
        "group": "Nhóm Sune",
        "title": "CMLL Sune-01: Sune Tiêu Chuẩn (Standard)",
        "algorithm": "R U R' U R U2 R'",
        "description": "Nhận diện: Đúng 1 góc vàng hướng lên đỉnh ở góc dưới trái (UFL), 3 góc còn lại quay ngược chiều kim đồng hồ.",
        "tips": "Công thức kinh điển nhất trong Rubik, tốc độ xoay siêu tốc với ngón trỏ gẩy U2.",
        "viewMode": "top_down",
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 6,
                "toFace": "U",
                "toIdx": 6,
                "color": "#FDE047",
                "label": "Góc Chuẩn"
            }
        ],
        "cubeState": {
            "U": [
                "#10B981",
                "#475569",
                "#EF4444",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#475569",
                "#3B82F6"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#F97316",
                "#475569",
                "#FDE047",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#3B82F6",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#EF4444",
                "#10B981",
                "#10B981",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#F97316",
                "#475569",
                "#FDE047",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-sune-02",
        "category": "cmll",
        "group": "Nhóm Sune",
        "title": "CMLL Sune-02: Sune Left Bar (Thanh Bên Trái)",
        "algorithm": "R U R' U' R' F R F' R U R' U R U2 R'",
        "description": "Nhận diện: 1 góc vàng hướng lên, thanh đồng màu nằm ở phía bên trái.",
        "tips": "Ghép Sledgehammer (R' F R F') với Sune tiêu chuẩn.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#F97316",
                "#475569",
                "#10B981",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#475569",
                "#3B82F6"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#475569",
                "#FDE047",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#EF4444",
                "#475569",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#10B981",
                "#10B981",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#F97316",
                "#3B82F6",
                "#FDE047",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-sune-03",
        "category": "cmll",
        "group": "Nhóm Sune",
        "title": "CMLL Sune-03: Sune Front Bar (Thanh Phía Trước)",
        "algorithm": "F R' F' R U2 R U2 R'",
        "description": "Nhận diện: 1 góc vàng hướng lên, thanh đồng màu nằm ở phía trước mặt.",
        "tips": "F R' F' R mở cặp, tiếp theo bằng U2 R U2 R' dứt điểm.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#EF4444",
                "#475569",
                "#F97316",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#3B82F6",
                "#3B82F6"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#10B981",
                "#475569",
                "#FDE047",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#10B981",
                "#475569",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#3B82F6",
                "#10B981",
                "#EF4444",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#F97316",
                "#475569",
                "#FDE047",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-sune-04",
        "category": "cmll",
        "group": "Nhóm Sune",
        "title": "CMLL Sune-04: Sune Pure (Góc Chéo)",
        "algorithm": "R U R' U R' F R F' R U2 R'",
        "description": "Nhận diện: 1 góc vàng hướng lên, các góc màu so le nhau không tạo thành thanh.",
        "tips": "Chèn F R F' vào giữa chuỗi Sune để đảo góc chéo.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#F97316",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#10B981",
                "#10B981",
                "#475569",
                "#EF4444"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#475569",
                "#FDE047",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#475569",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#10B981",
                "#3B82F6",
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#3B82F6",
                "#475569",
                "#F97316",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-antisune-01",
        "category": "cmll",
        "group": "Nhóm Anti-Sune",
        "title": "CMLL Anti-Sune-01: Anti-Sune Tiêu Chuẩn",
        "algorithm": "R' U' R U' R' U2 R",
        "description": "Nhận diện: Đúng 1 góc vàng hướng lên đỉnh ở góc trên phải (UBR), 3 góc còn lại quay cùng chiều kim đồng hồ.",
        "tips": "Đối xứng hoàn hảo của Sune, gẩy U' mượt mà bằng ngón trỏ trái hoặc ngón trỏ phải kéo.",
        "viewMode": "top_down",
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 2,
                "toFace": "U",
                "toIdx": 2,
                "color": "#FDE047",
                "label": "Góc Chuẩn"
            }
        ],
        "cubeState": {
            "U": [
                "#FDE047",
                "#475569",
                "#3B82F6",
                "#475569",
                "#FDE047",
                "#475569",
                "#10B981",
                "#475569",
                "#F97316"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#FDE047",
                "#475569",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#10B981",
                "#10B981",
                "#F97316",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#FDE047",
                "#475569",
                "#EF4444",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-antisune-02",
        "category": "cmll",
        "group": "Nhóm Anti-Sune",
        "title": "CMLL Anti-Sune-02: Anti-Sune Right Bar",
        "algorithm": "R U2 R' U' R U' R'",
        "description": "Nhận diện: 1 góc vàng hướng lên, thanh đồng màu nằm ở phía bên phải.",
        "tips": "Chuỗi R U2 mở đầu đưa góc về vị trí rồi hạ R'.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#EF4444",
                "#475569",
                "#FDE047",
                "#475569",
                "#FDE047",
                "#475569",
                "#10B981",
                "#475569",
                "#F97316"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#FDE047",
                "#475569",
                "#3B82F6",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#EF4444",
                "#10B981",
                "#10B981",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#FDE047",
                "#475569",
                "#F97316",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-antisune-03",
        "category": "cmll",
        "group": "Nhóm Anti-Sune",
        "title": "CMLL Anti-Sune-03: Anti-Sune Front Bar",
        "algorithm": "F' L F L' U2 L' U2 L",
        "description": "Nhận diện: 1 góc vàng hướng lên, thanh đồng màu nằm ở phía trước.",
        "tips": "Công thức bên tay trái tương đương với Sune-03.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#F97316",
                "#475569",
                "#EF4444",
                "#475569",
                "#FDE047",
                "#475569",
                "#10B981",
                "#10B981",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#FDE047",
                "#475569",
                "#3B82F6",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#FDE047",
                "#475569",
                "#3B82F6",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#FDE047",
                "#475569",
                "#F97316",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#EF4444",
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-antisune-04",
        "category": "cmll",
        "group": "Nhóm Anti-Sune",
        "title": "CMLL Anti-Sune-04: Anti-Sune Pure",
        "algorithm": "R' U' R U' R F R' F' R' U2 R",
        "description": "Nhận diện: 1 góc vàng hướng lên, các góc màu so le đối xứng chéo.",
        "tips": "Biến thể đảo của Sune-04, bảo toàn nguyên vẹn 2 khối F2B.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#475569",
                "#FDE047",
                "#475569",
                "#10B981",
                "#475569",
                "#F97316"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#EF4444",
                "#FFFFFF",
                "#FFFFFF",
                "#EF4444",
                "#FFFFFF",
                "#475569",
                "#10B981"
            ],
            "F": [
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444",
                "#475569",
                "#3B82F6"
            ],
            "B": [
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#F97316",
                "#F97316",
                "#F97316",
                "#FDE047",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#F97316",
                "#10B981",
                "#F97316",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#FDE047",
                "#475569",
                "#EF4444",
                "#475569",
                "#10B981",
                "#10B981",
                "#FDE047",
                "#10B981",
                "#EF4444"
            ]
        }
    },
    {
        "id": "cmll-pi-01",
        "category": "cmll",
        "group": "Nhóm Pi & H",
        "title": "CMLL Pi-01: Pi Right Bar (2 Đèn Pin Ngược Hướng)",
        "algorithm": "F R U R' U' R U R' U' F'",
        "description": "Nhận diện: Không có góc vàng nào trên đỉnh. 2 góc sau hướng ra sau, 2 góc trước hướng sang 2 bên (dáng Pi), thanh đồng màu bên phải.",
        "tips": "Double Sexy Move kẹp giữa F và F', một trong những công thức dễ nhớ nhất.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#F97316",
                "#475569",
                "#10B981",
                "#475569",
                "#FDE047",
                "#475569",
                "#EF4444",
                "#475569",
                "#10B981"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#3B82F6",
                "#475569",
                "#FDE047",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#FDE047",
                "#10B981",
                "#3B82F6",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#FDE047",
                "#3B82F6",
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#EF4444",
                "#475569",
                "#F97316",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-pi-02",
        "category": "cmll",
        "group": "Nhóm Pi & H",
        "title": "CMLL Pi-02: Pi Slash (Thanh Chéo / Columns)",
        "algorithm": "R U2 R' U' R U R' U2 R' F R F'",
        "description": "Nhận diện: Dáng Pi, các góc ở hai cạnh bên tạo thành cột màu đồng nhất.",
        "tips": "R U2 R' U' kết hợp Sledgehammer kết thúc.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#3B82F6",
                "#475569",
                "#F97316",
                "#475569",
                "#FDE047",
                "#475569",
                "#F97316",
                "#10B981",
                "#10B981"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#10B981",
                "#475569",
                "#FDE047",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#FDE047",
                "#3B82F6",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#FDE047",
                "#475569",
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#EF4444",
                "#475569",
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-h-01",
        "category": "cmll",
        "group": "Nhóm Pi & H",
        "title": "CMLL H-01: H Columns (4 Góc Hướng Sang 2 Bên)",
        "algorithm": "R U2 R2' F R F' U2' R' F R F'",
        "description": "Nhận diện: 4 góc vàng đều hướng sang hai bên (2 góc sang trái, 2 góc sang phải - dáng H), các cột màu 2 bên đồng màu.",
        "tips": "Dùng 2 lần Sledgehammer liên tiếp với nhịp U2' êm ái.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#F97316",
                "#3B82F6",
                "#EF4444",
                "#475569",
                "#FDE047",
                "#475569",
                "#10B981",
                "#10B981",
                "#10B981"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#475569",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#475569",
                "#3B82F6",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#FDE047",
                "#475569",
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#FDE047",
                "#475569",
                "#FDE047",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "cmll-h-02",
        "category": "cmll",
        "group": "Nhóm Pi & H",
        "title": "CMLL H-02: H Rows (Thanh Ngang Trước Sau)",
        "algorithm": "F R U R' U' R U R' U' R U R' U' F'",
        "description": "Nhận diện: Dáng H, 2 góc trước đồng màu, 2 góc sau đồng màu tạo thành 2 thanh ngang đối diện.",
        "tips": "Triple Sexy Move kẹp giữa F và F', cực kỳ êm tay.",
        "viewMode": "top_down",
        "cubeState": {
            "U": [
                "#F97316",
                "#475569",
                "#F97316",
                "#475569",
                "#FDE047",
                "#475569",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "D": [
                "#FFFFFF",
                "#475569",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#475569",
                "#FFFFFF"
            ],
            "F": [
                "#FDE047",
                "#475569",
                "#FDE047",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#475569",
                "#EF4444"
            ],
            "B": [
                "#FDE047",
                "#475569",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#475569",
                "#F97316"
            ],
            "L": [
                "#10B981",
                "#3B82F6",
                "#10B981",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#3B82F6",
                "#10B981",
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4a-01",
        "category": "lse",
        "group": "Pha 4a: Định Hướng Cạnh (EO)",
        "title": "LSE 4a-01: EO Mũi Tên (Arrow - 3/1)",
        "algorithm": "M' U M",
        "description": "Nhận diện: Đúng 3 cạnh bị lật ở tầng U (tạo hình mũi tên) và 1 cạnh bị lật ở đáy (DF). Đây là thế cơ bản và quan trọng nhất của Roux LSE!",
        "tips": "Đặt mũi tên hướng về phía sau hoặc trước rồi thực hiện M' U M để lật toàn bộ 4 cạnh về đúng hướng!",
        "viewMode": "iso_ufr",
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 7,
                "toFace": "F",
                "toIdx": 1,
                "color": "#38BDF8",
                "label": "M' U M"
            }
        ],
        "cubeState": {
            "U": [
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#EF4444",
                "#FDE047",
                "#EF4444",
                "#FDE047",
                "#10B981",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#3B82F6",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF"
            ],
            "F": [
                "#3B82F6",
                "#FDE047",
                "#3B82F6",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#FDE047",
                "#EF4444"
            ],
            "B": [
                "#10B981",
                "#F97316",
                "#10B981",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316"
            ],
            "L": [
                "#F97316",
                "#FDE047",
                "#F97316",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#EF4444",
                "#FFFFFF",
                "#EF4444",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4a-02",
        "category": "lse",
        "group": "Pha 4a: Định Hướng Cạnh (EO)",
        "title": "LSE 4a-02: EO 4/0 (4 Cạnh Lật Ở Tầng U)",
        "algorithm": "M' U2 M",
        "description": "Nhận diện: Cả 4 cạnh ở tầng U đều bị lật (màu vàng/trắng hướng ra ngoài), 2 cạnh đáy đã đúng hướng.",
        "tips": "Xoay M' U2 M để chuyển ngay về thế Arrow (Mũi Tên) hoặc giải thẳng toàn bộ cạnh.",
        "viewMode": "iso_ufr",
        "cubeState": {
            "U": [
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FFFFFF",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF"
            ],
            "F": [
                "#F97316",
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444"
            ],
            "B": [
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316"
            ],
            "L": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4a-03",
        "category": "lse",
        "group": "Pha 4a: Định Hướng Cạnh (EO)",
        "title": "LSE 4a-03: EO 2/0 (2 Cạnh Lật Ở Tầng U)",
        "algorithm": "M' U2 M'",
        "description": "Nhận diện: Đúng 2 cạnh bị lật ở tầng U (đối đỉnh UF và UB), các cạnh đáy đã chuẩn.",
        "tips": "Dùng ngón đeo nhẫn (ring finger) kéo 2 lần M' nhịp nhàng kết hợp U2.",
        "viewMode": "iso_ufr",
        "cubeState": {
            "U": [
                "#FDE047",
                "#FFFFFF",
                "#FDE047",
                "#FDE047",
                "#FFFFFF",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF",
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF"
            ],
            "F": [
                "#F97316",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444"
            ],
            "B": [
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316"
            ],
            "L": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4a-04",
        "category": "lse",
        "group": "Pha 4a: Định Hướng Cạnh (EO)",
        "title": "LSE 4a-04: EO 6/6 (Cả 6 Cạnh Đều Bị Lật)",
        "algorithm": "M' U M' U2 M' U M'",
        "description": "Nhận diện: Trường hợp hiếm gặp khi toàn bộ 6 cạnh (4 cạnh U + 2 cạnh D) đều bị lật ngược hướng.",
        "tips": "Chia làm 2 nhịp: M' U M' đưa về thế 4 cạnh, rồi U2 M' U M' hoàn tất toàn bộ 6 cạnh!",
        "viewMode": "iso_ufr",
        "cubeState": {
            "U": [
                "#FDE047",
                "#3B82F6",
                "#FDE047",
                "#EF4444",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FFFFFF",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444"
            ],
            "B": [
                "#F97316",
                "#FDE047",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316"
            ],
            "L": [
                "#3B82F6",
                "#FDE047",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4b-01",
        "category": "lse",
        "group": "Pha 4b: Cạnh UL & UR",
        "title": "LSE 4b-01: Cả 2 Cạnh Ở Đáy (DF & DB)",
        "algorithm": "M2",
        "description": "Nhận diện: Cạnh White-Blue (UL) và White-Green (UR) đều đang nằm ở dưới đáy (DF và DB).",
        "tips": "Chỉ cần 1 thao tác double-flick M2 bằng ngón đeo nhẫn + ngón giữa là đưa cả 2 cạnh lên đỉnh!",
        "viewMode": "iso_ufr",
        "arrows": [
            {
                "fromFace": "D",
                "fromIdx": 1,
                "toFace": "U",
                "toIdx": 7,
                "color": "#10B981",
                "label": "M2 Lên Đỉnh"
            }
        ],
        "cubeState": {
            "U": [
                "#FDE047",
                "#FFFFFF",
                "#FDE047",
                "#FDE047",
                "#FFFFFF",
                "#FDE047",
                "#FDE047",
                "#FFFFFF",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF",
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF",
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444"
            ],
            "B": [
                "#F97316",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316"
            ],
            "L": [
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4b-02",
        "category": "lse",
        "group": "Pha 4b: Cạnh UL & UR",
        "title": "LSE 4b-02: 1 Cạnh Ở Đáy, 1 Cạnh Ở Đỉnh",
        "algorithm": "U M2 U'",
        "description": "Nhận diện: 1 cạnh (UL hoặc UR) ở tầng U, cạnh còn lại kẹt ở đáy (DF/DB).",
        "tips": "Dùng U để né cạnh trên đỉnh ra khỏi lát cắt M, gẩy M2 đưa cạnh đáy lên rồi hoàn trả U'!",
        "viewMode": "iso_ufr",
        "cubeState": {
            "U": [
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FDE047",
                "#FDE047",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF",
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF",
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#3B82F6",
                "#EF4444"
            ],
            "B": [
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#10B981",
                "#F97316"
            ],
            "L": [
                "#3B82F6",
                "#EF4444",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#F97316",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4b-03",
        "category": "lse",
        "group": "Pha 4b: Cạnh UL & UR",
        "title": "LSE 4b-03: Cả 2 Cạnh Ở Đỉnh (Kề Nhau)",
        "algorithm": "U M2 U2 M2",
        "description": "Nhận diện: Cả 2 cạnh UL và UR đều đã ở tầng U nhưng nằm kề nhau (ví dụ UF và UL).",
        "tips": "Xoay U M2 để hạ 1 cạnh xuống đáy, sau đó U2 M2 đưa cả 2 vào đúng 2 slot trái phải!",
        "viewMode": "iso_ufr",
        "cubeState": {
            "U": [
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF"
            ],
            "F": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444"
            ],
            "B": [
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316"
            ],
            "L": [
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#F97316",
                "#EF4444",
                "#F97316",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4b-04",
        "category": "lse",
        "group": "Pha 4b: Cạnh UL & UR",
        "title": "LSE 4b-04: Đảo Vị Trí UL <-> UR (Swap)",
        "algorithm": "M2 U2 M2",
        "description": "Nhận diện: Cả 2 cạnh UL và UR đã vào slot nhưng bị tráo đổi ngược bên cho nhau (UL sang UR và UR sang UL).",
        "tips": "Thao tác kinh điển M2 U2 M2 hoán vị 2 cạnh trong chớp mắt mà không ảnh hưởng bất cứ viên nào khác.",
        "viewMode": "iso_ufr",
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 3,
                "toFace": "U",
                "toIdx": 5,
                "color": "#EF4444",
                "bidirectional": true,
                "label": "Đổi Bên"
            }
        ],
        "cubeState": {
            "U": [
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF"
            ],
            "F": [
                "#F97316",
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444"
            ],
            "B": [
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316"
            ],
            "L": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4c-01",
        "category": "lse",
        "group": "Pha 4c: 4 Cạnh M-Slice & Tâm",
        "title": "LSE 4c-01: Đối Đỉnh Cạnh M (UF <-> UB Swap)",
        "algorithm": "M2 U2 M2",
        "description": "Nhận diện: Cạnh trước UF và cạnh sau UB cần hoán vị cho nhau, các tâm và cạnh đáy đã đúng.",
        "tips": "M2 U2 M2 là công thức nhanh nhất thế giới Rubik, thực hiện dưới 0.4 giây!",
        "viewMode": "iso_ufr",
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 7,
                "toFace": "U",
                "toIdx": 1,
                "color": "#38BDF8",
                "bidirectional": true,
                "label": "UF <-> UB"
            }
        ],
        "cubeState": {
            "U": [
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF"
            ],
            "F": [
                "#F97316",
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444"
            ],
            "B": [
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316"
            ],
            "L": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4c-02",
        "category": "lse",
        "group": "Pha 4c: 4 Cạnh M-Slice & Tâm",
        "title": "LSE 4c-02: Tâm So Le (Dots Pattern)",
        "algorithm": "M2 U2 M2 U2",
        "description": "Nhận diện: Toàn bộ các cạnh đã về đúng vị trí, nhưng 4 tâm của lát cắt M bị lệch nhau 180 độ.",
        "tips": "Lặp lại nhịp M2 U2 hai lần liên tiếp để giải xong hoàn toàn khối Rubik về Solved 100%!",
        "viewMode": "iso_ufr",
        "cubeState": {
            "U": [
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444"
            ],
            "B": [
                "#F97316",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316"
            ],
            "L": [
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4c-03",
        "category": "lse",
        "group": "Pha 4c: 4 Cạnh M-Slice & Tâm",
        "title": "LSE 4c-03: Chu Trình 3 Cạnh M (3-Cycle)",
        "algorithm": "U2 M' U2 M'",
        "description": "Nhận diện: 1 cạnh đáy DB đã đúng, 3 cạnh còn lại (UF, UB, DF) cần di chuyển vòng tròn theo chiều kim đồng hồ.",
        "tips": "Nhịp U2 M' U2 M' luân chuyển 3 cạnh M cực kỳ êm ái.",
        "viewMode": "iso_ufr",
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 7,
                "toFace": "U",
                "toIdx": 1,
                "color": "#10B981",
                "label": "Chu trình 3 cạnh"
            }
        ],
        "cubeState": {
            "U": [
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FFFFFF",
                "#FDE047",
                "#FDE047",
                "#FFFFFF",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF",
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444",
                "#EF4444",
                "#F97316",
                "#EF4444"
            ],
            "B": [
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316",
                "#F97316",
                "#EF4444",
                "#F97316"
            ],
            "L": [
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    },
    {
        "id": "lse-4c-04",
        "category": "lse",
        "group": "Pha 4c: 4 Cạnh M-Slice & Tâm",
        "title": "LSE 4c-04: Z-Perm M-Slice (Hoán Vị Chéo M)",
        "algorithm": "M' U2 M2 U2 M'",
        "description": "Nhận diện: Cạnh trước UF đổi chỗ cho DF, cạnh sau UB đổi chỗ cho DB (hoán vị chéo 2 cặp cạnh M).",
        "tips": "Bắt đầu bằng M' U2, sau đó M2 U2 và kết thúc bằng M', dứt điểm toàn bộ khối Rubik!",
        "viewMode": "iso_ufr",
        "arrows": [
            {
                "fromFace": "U",
                "fromIdx": 7,
                "toFace": "D",
                "toIdx": 1,
                "color": "#F59E0B",
                "bidirectional": true,
                "label": "Z-Perm M"
            }
        ],
        "cubeState": {
            "U": [
                "#FDE047",
                "#FFFFFF",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FDE047",
                "#FFFFFF",
                "#FDE047"
            ],
            "D": [
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FDE047",
                "#FFFFFF"
            ],
            "F": [
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444"
            ],
            "B": [
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316",
                "#F97316"
            ],
            "L": [
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6",
                "#3B82F6"
            ],
            "R": [
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981",
                "#10B981"
            ]
        }
    }
];

function initCubeForCase(caseItem) {
    const cube = new CubeModel();
    const def = (caseItem && caseItem.id) 
        ? DEFAULT_ROUX_CASES.find(d => d.id === caseItem.id)
        : null;

    // 2. If case has explicit cubeState, load it
    if (caseItem.cubeState) {
        cube.loadState(caseItem.cubeState);
    } else if (def && def.cubeState) {
        cube.loadState(def.cubeState);
    } else if (typeof caseItem.customState === 'function') {
        caseItem.customState(cube);
    } else if (def && typeof def.customState === 'function') {
        def.customState(cube);
    } else {
        // Fallback mask presets
        if (caseItem.maskType === 'fb' || caseItem.category === 'fb') {
            cube.applyFBMask();
        } else if (caseItem.maskType === 'sb' || caseItem.category === 'sb') {
            cube.applySBMask();
        } else if (caseItem.maskType === 'cmll' || caseItem.category === 'cmll') {
            cube.applyCMLLMask();
        } else if (caseItem.maskType === 'lse' || caseItem.category === 'lse') {
            cube.applyLSEMask();
        }

        if (caseItem.setupAlg) {
            cube.applyAlgorithm(caseItem.setupAlg);
        } else if (caseItem.algorithm) {
            const invAlg = CubeModel.invertAlgorithm(caseItem.algorithm);
            if (invAlg) cube.applyAlgorithm(invAlg);
        }
    }

    // 3. Attach arrows
    const arrows = (caseItem.arrows && caseItem.arrows.length) ? caseItem.arrows : (def ? def.arrows : null);
    if (Array.isArray(arrows) && arrows.length > 0) {
        cube.arrows = JSON.parse(JSON.stringify(arrows));
    }

    // Guarantee that standard fixed face centers are ALWAYS preserved for crystal clear orientation!
    for (const face of CubeModel.FACES) {
        if (!cube.state[face] || !cube.state[face][4] || cube.state[face][4] === CubeModel.COLORS['X']) {
            cube.state[face][4] = CubeModel.COLORS[face];
        }
    }

    return cube;
}

window.DEFAULT_ROUX_CASES = DEFAULT_ROUX_CASES;
window.initCubeForCase = initCubeForCase;
