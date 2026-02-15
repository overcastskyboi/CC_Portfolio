# OCI Project: Full-Stack Portfolio & Telemetry Infrastructure

This document outlines the architecture, deployment, and optimization of an Oracle Cloud Infrastructure (OCI) Always Free instance, serving a dual-identity portfolio site with real-time telemetry.

## Architecture Overview

**Host:** OCI Compute Instance (IP: 129.80.222.26)
*   **Shape:** Ampere A1.Flex (ARM) - 4 OCPU, 24 GB RAM
*   **Operating System:** Oracle Linux 9
*   **Disk:** 83GB Boot Volume partition expansion, with a 4GB Swap File for stability.

**Orchestration:** Docker Compose (v2)
*   Manages a multi-container stack for backend services.

**Dual-Container Stack:**
1.  **CEC Metrics API (`cec-metrics-api`):**
    *   Node.js backend, mapping host `/proc` and `/sys` for kernel-level telemetry (CPU, RAM, Disk Usage, Uptime, Load).
    *   Exposes metrics via REST API on Port 3000.
    *   **Robustness:** Improved error handling for `df` command execution and more robust parsing of disk metrics.
2.  **Portainer (`portainer-console`):
    *   Visual container management console on Port 9000.

**Frontend:**
*   Multi-page "Dual-Boot" portfolio (`S:\Oracle Cloud\Portfolio_Site`) served via Nginx.
*   `app.js` handles:
    *   **Real-time Telemetry:** Polls the CEC Metrics API (now `https://129.80.222.26:3000/metrics`) for live hardware metrics and "Server Live" status. Disk metrics display gracefully handles unavailable or zero values.
    *   **Music Player:** Integrates a functional music player that streams audio files from the OCI Node.js API (`https://129.80.222.26:3000/stream/`).
*   **Client-Side Scripting:** Vanilla JavaScript for dynamic interactions.

## Security & Network Hardening

*   **Firewall:** Linux `firewalld` configured on the instance.
*   **OCI Network Security Lists (Stateful Ingress Rules):**
    *   **Port 22 (SSH):** Locked down to `99.73.115.55/32` (or your specific IP) for secure remote access.
    *   **Port 3000 (Metrics API):** Open to `0.0.0.0/0` to allow public frontend access.
    *   **Port 9000 (Portainer):** Locked down to `0.0.0.0/0` (or your specific IP) for management console access.
*   **IP Persistence:** Configured with a Reserved Public IP to ensure the portfolio URL remains stable across instance reboots.

## Always Free Optimization & Reclamation Protection

*   **Full Resource Utilization:** Instance scaled to utilize the full 4 OCPU / 24 GB RAM Always Free allocation.
*   **"Never-Idle" Script (`never_idle.sh`):**
    *   A `crontab` job that periodically generates ~25% CPU load and minimal network traffic.
    *   Ensures CPU/Network utilization remains above Oracle's 20% reclamation threshold, preventing idle resource reclamation.

## Deployment Strategy

*   **Local Development:** All source code maintained in `S:\Oracle Cloud\Portfolio_Site`.
*   **OCI Deployment:** Automated `deploy.ps1` script (v3.1 - "Self-Updating" Super-Deploy) pushes frontend (HTML, CSS, JS) changes to the OCI Nginx web root.
*   **Media Hosting:** Large media files (music, covers) are *not* tracked by GitHub and are instead served directly by the OCI Node.js API from a dedicated 'music' directory on the OCI instance.
*   **GitHub Integration:** Code pushed to `https://github.com/overcastskyboi/CC-Portfolio` for version control and GitHub Pages hosting, with auto-commit timestamping.

---

## Important Considerations & Known Issues

*   **Mixed Content / HTTPS Certificate Warnings:** The Frontend (hosted on HTTPS GitHub Pages) attempts to connect to the OCI Node.js API (telemetry and media streaming) over HTTPS directly to an IP address (e.g., `https://129.80.222.26:3000/...`). This configuration often leads to browser warnings or errors related to untrusted SSL certificates, as HTTPS with raw IP addresses is typically not trusted without a proper domain and server-side SSL configuration. This does not prevent functionality but may present security warnings to users.
*   **OCI Media Setup:** For the music player to function, the 'music' directory on the OCI instance (within `/home/opc/docker/telemetry/`) must exist and contain the actual media files (e.g., `.mp3`, `.webp` covers).