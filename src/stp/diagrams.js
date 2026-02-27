// Step 0: Start Screen
const startScreen = `                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                  ┌─────────────────────────────────────────────────────────────────────────────┐       
                  │                                                                             │       
                  │ ▄█████ ▄▄▄▄   ▄▄▄  ▄▄  ▄▄ ▄▄  ▄▄ ▄▄ ▄▄  ▄▄  ▄▄▄▄   ██████ ▄▄▄▄  ▄▄▄▄▄ ▄▄▄▄▄ │       
                  │ ▀▀▀▄▄▄ ██▄█▀ ██▀██ ███▄██ ███▄██ ██ ███▄██ ██ ▄▄     ██   ██▄█▄ ██▄▄  ██▄▄  │       
                  │ █████▀ ██    ██▀██ ██ ▀██ ██ ▀██ ██ ██ ▀██ ▀███▀     ██   ██ ██ ██▄▄▄ ██▄▄▄ │       
                  │                                                                             │       
                  │                                                                             │       
                  │                                                                             │       
                  │               █████▄ ▄▄▄▄   ▄▄▄ ▄▄▄▄▄▄ ▄▄▄   ▄▄▄▄  ▄▄▄  ▄▄                  │       
                  │               ██▄▄█▀ ██▄█▄ ██▀██  ██  ██▀██ ██▀▀▀ ██▀██ ██                  │       
                  │               ██     ██ ██ ▀███▀  ██  ▀███▀ ▀████ ▀███▀ ██▄▄▄               │       
                  │                                                                             │       
                  │                                                                             │       
                  └─────────────────────────────────────────────────────────────────────────────┘       

                           | Terminal-based presentation on Spanning Tree Protocol (STP) |                                                    

                         
This project demonstrates the operation of the Spanning Tree Protocol (STP) in a network with multiple switches and hosts

Features:
# Visualizes network topologies and broadcast storms
# Explains how STP prevents network loops
# Interactive navigation through network states

Controls:
# [Tab↹] Next Slide
# [←Backspace] Previous Slide
# [z] Focus on current topic / Next point
# [Ctrl+C] Quit






                                                                                        Credit: Aeryn Grindle
                                                                                                (OrkoTheMage)
                                                                                                © 2026
`

// Step 1: Initial topology with 4 switches and 4 hosts
  const baseDiagram = `
                                                                                                                    
┌───────────────┐                            ┌────────────────┐                                 ┌───────────────┐  
│ ┌───────────┐ │                    ┌───────│    SWITCH 3    │───────┐                         │ ┌───────────┐ │  
│ │           │ │                    │       │                │       │                         │ │           │ │  
│ │           │ │                    │       └────────────────┘       │       ┌─────────────────┤ │           │ │  
│ │     A     │ ├───────────────┐    │                                │       │                 │ │     C     │ │  
│ │           │ │               │    │                                │       │                 │ │           │ │  
│ │           │ │               │    │                                │       │                 │ │           │ │  
│ └───────────┘ │               │    │                                │       │                 │ └───────────┘ │  
└───┌───────┐───┘        ┌──────┴────┴────┐                      ┌────┴───────┴───┐             └───┌───────┐───┘  
    └───────┘            │    SWITCH 1    │──────────────────────│    SWITCH 2    │                 └───────┘      
                         │                │                      │                │                                
┌───────────────┐        └──────┬─────────┘                      └────────────┬───┘             ┌───────────────┐  
│ ┌───────────┐ │               │                                             │                 │ ┌───────────┐ │  
│ │           │ │               │                                             │                 │ │           │ │  
│ │           │ │               │                                             │                 │ │           │ │  
│ │     B     │ │               │                                             │                 │ │     D     │ │  
│ │           │ ├───────────────┘                                             └─────────────────│ │           │ │  
│ │           │ │                                                                               │ │           │ │  
│ └───────────┘ │                                                                               │ └───────────┘ │  
└───┌───────┐───┘                                                                               └───┌───────┐───┘  
    └───────┘                                                                                       └───────┘      

# Here we have a topology of three switches and four end devices - A, B, C, and D

# In order for these network devices to communicate, they need to know each others MAC addresses

# These devices will send out a Broadcast Signal asking for that device's MAC address - This is know as an ARP (Address Resolution Protocol) Request

# Switches will send out any Broadcast Frame it receives through every device (port) connected to it - Often called "flooding" the frame through the network

# This forms the Local Area Network (LAN) - multiple switches offer redundancy and better control of traffic

# However, this topology has loops - if (A), for example, sends a broadcast frame to Sw1:
■ It will be sent to (B) as well as Sw2 and 3
■ In which, Sw3 will also send it to Sw2
■ Which will send it back to its origin on Sw1
...it will be sent around the network indefinitely, causing a Broadcast Storm

# This is where Spanning Tree Protocol (STP) comes in - it prevents loops by blocking certain ports and creating a loop-free logical topology while still maintaining physical redundancy
`

// Step 2: Show BPDU exchange between switches
  const bpduDiagram = `
                                                                                                                    
                                     ┌─────┐                                                                       
                                     │BPDUs│                                                                       
┌───────────────┐                    └─────┘ ┌────────────────┐                                 ┌───────────────┐
│ ┌───────────┐ │                    ┌───────│    SWITCH 3    ◄───────┐                         │ ┌───────────┐ │  
│ │           │ │                    │┌──────►                ├─────┐ │                         │ │           │ │  
│ │           │ │                    ││      └────────────────┘     │ │       ┌─────────────────┤ │           │ │  
│ │     A     │ ├───────────────┐    ││                    ┌─────┐  │ │       │                 │ │     C     │ │  
│ │           │ │               │    ││                    │BPDUs│  │ │       │                 │ │           │ │  
│ │           │ │               │    ││                    └─────┘  │ │       │                 │ │           │ │  
│ └───────────┘ │               │    ││                             │ │       │                 │ └───────────┘ │
└───┌───────┐───┘        ┌──────┴────▼└───┐                      ┌──▼─┴───────┴───┐             └───┌───────┐───┘
    └───────┘            │    SWITCH 1    ┼──────────────────────►    SWITCH 2    │                 └───────┘      
                         │                ◄──────────────────────┐                │                                
┌───────────────┐        └──────┬─────────┘       ┌─────┐        └────────────┬───┘             ┌───────────────┐
│ ┌───────────┐ │               │                 │BPDUs│                     │                 │ ┌───────────┐ │
│ │           │ │               │                 └─────┘                     │                 │ │           │ │
│ │           │ │               │                                             │                 │ │           │ │
│ │     B     │ │               │                                             │                 │ │     D     │ │
│ │           │ ├───────────────┘                                             └─────────────────│ │           │ │
│ │           │ │                                                                               │ │           │ │
│ └───────────┘ │                                                                               │ └───────────┘ │
└───┌───────┐───┘                                                                               └───┌───────┐───┘
    └───────┘                                                                                       └───────┘  

# STP uses Bridge Protocol Data Units (BPDUs) to exchange information about network topology between switches

# BPDUs are sent every 2 seconds (Hello Time) and propagate quickly across the network. STP requires a 30-50 seconds to converge after a topology change, depending on the network size and configuration

Extra Information:
----------------------
■ Hello Time: 2s - Interval between BPDU transmissions
■ Forward Delay: 15s - Time a port spends in Listening and Learning states before forwarding
■ Max Age: 20s - Maximum age of a received BPDU before it is discarded

# Once BPDUs are exchanged, the switch with the lowest Bridge ID is elected as the root bridge. STP then determines which ports should forward traffic and which should be blocked
`

// Step 3: Show root bridge election and resulting topology
  const rbDiagram = `

                                            ┌─────────────────┐                                                    
                                            │      24576      │                                                    
                                            │00:1B:54:8A:00:03│                                                    
                                            └─────────────────┘                                                    
┌───────────────┐                            ┌────────────────┐                                 ┌───────────────┐
│ ┌───────────┐ │                    ┌───────│    SWITCH 3    │───────┐                         │ ┌───────────┐ │
│ │           │ │                    │       │       RB       │       │                         │ │           │ │
│ │           │ │                    │       └────────────────┘       │       ┌─────────────────┤ │           │ │
│ │     A     │ ├───────────────┐    │                                │       │                 │ │     C     │ │
│ │           │ │               │    │                                │       │                 │ │           │ │
│ │           │ │               │    │                                │       │                 │ │           │ │
│ └───────────┘ │               │    │                                │       │                 │ └───────────┘ │
└───┌───────┐───┘        ┌──────┴────┴────┐                      ┌────┴───────┴───┐             └───┌───────┐───┘
    └───────┘            │    SWITCH 1    │──────────────────────│    SWITCH 2    │                 └───────┘      
                         │                │                      │                │                                
┌───────────────┐        └──────┬─────────┘                      └────────────┬───┘             ┌───────────────┐
│ ┌───────────┐ │               │┌─────────────────┐       ┌─────────────────┐│                 │ ┌───────────┐ │
│ │           │ │               ││      32768      │       │      32768      ││                 │ │           │ │
│ │           │ │               ││00:1B:54:8A:00:01│       │00:1B:54:8A:00:02││                 │ │           │ │
│ │     B     │ │               │└─────────────────┘       └─────────────────┘│                 │ │     D     │ │
│ │           │ ├───────────────┘                                             └─────────────────│ │           │ │
│ │           │ │                                                                               │ │           │ │
│ └───────────┘ │                                                                               │ └───────────┘ │
└───┌───────┐───┘                                                                               └───┌───────┐───┘
    └───────┘                                                                                       └───────┘        

# After the BPDU exchange, Sw3 is elected as the root bridge since it has the lowest Bridge ID

# The Bridge ID is a combination of the switch's priority (default 32768) and its MAC address

# Sw3 has the lowest Bridge ID because it has the lowest priority

# Even though Sw1 has the lowest MAC address, it is NOT elected as the root bridge

# MAC addresses are used as tiebreakers when switches have the same priority - the switch with the lowest MAC address wins in these cases

# The root bridge's importance is that it serves as the reference point for all path cost calculations in the network - all switches determine their best path to the root bridge and block any redundant paths
`

// Step 4: Show port states after STP converges
const portDiagram = `

                                            ┌─────────────────┐                                                  
                                            │      24576      │                                                  
                                            │00:1B:54:8A:00:03│                                                  
                                            └─────────────────┘                                                  
┌───────────────┐                            ┌────────────────┐                                 ┌───────────────┐
│ ┌───────────┐ │                    ┌────DP─│    SWITCH 3    │─DP────┐                         │ ┌───────────┐ │
│ │           │ │                    │       │       RB       │       │                         │ │           │ │
│ │           │ │                    │       └────────────────┘       │       ┌─────────────────┤ │           │ │
│ │     A     │ ├───────────────┐    │                                │       │                 │ │     C     │ │
│ │           │ │               │    ├─── 1 Gbps            1 Gbps ───┼       │                 │ │           │ │
│ │           │ │               │    │                                │       │                 │ │           │ │
│ └───────────┘ │               │    RP                               RP      │                 │ └───────────┘ │
└───┌───────┐───┘        ┌──────┴────┴────┐                      ┌────┴───────┴───┐             └───┌───────┐───┘
    └───────┘            │    SWITCH 1    │─BP────────┬───────DP─│    SWITCH 2    │                 └───────┘    
                         │                │           │          │                │                              
┌───────────────┐        └──────┬─────────┘       100 Mbps       └────────────┬───┘             ┌───────────────┐
│ ┌───────────┐ │               │┌─────────────────┐       ┌─────────────────┐│                 │ ┌───────────┐ │
│ │           │ │               ││      32768      │       │      32768      ││                 │ │           │ │
│ │           │ │               ││00:1B:54:8A:00:01│       │00:1B:54:8A:00:02││                 │ │           │ │
│ │     B     │ │               │└─────────────────┘       └─────────────────┘│                 │ │     D     │ │
│ │           │ ├───────────────┘                                             └─────────────────│ │           │ │
│ │           │ │                                                                               │ │           │ │
│ └───────────┘ │                                                                               │ └───────────┘ │
└───┌───────┐───┘                                                                               └───┌───────┐───┘
    └───────┘                                                                                       └───────┘                                                                                                                                                                                                                                 
# After STP converges, we can find the root port (RP) for each switch - the port with the lowest path cost from non-root bridges to the root bridge

# Path cost is determined by the speed of the link - the faster the link, the lower the path cost (i.e table below)

# The designated port (DP) for a network segment is the port that forwards towards the root bridge at the lowest path cost

# The blocked port (BP) is the port that is blocked to prevent loops - in this case, the port connecting Sw1 and Sw2 is blocked since it has the highest path cost to the root bridge

# Blocked ports do not forward any traffic, but still receive BPDUs to monitor the network topology and can be unblocked if the topology changes
 ┌─────────────┐ 
 │  PATH COST  │  
 │10 Gbps = 2  │ 
 │1 Gbps = 4   │ 
 │100 Mbps = 19│ 
 │10 Mbps = 100│ 
 └─────────────┘ 
 `
const factsScreen = `                                                                                                                                                                                                                                                                
                            ┌─────────────────────────────────────────────────────────┐             
                            │                                                         │             
                            │  ██████ ▄▄ ▄▄ ▄▄  ▄▄   ██████ ▄▄▄   ▄▄▄▄ ▄▄▄▄▄▄ ▄▄▄▄    │             
                            │  ██▄▄   ██ ██ ███▄██   ██▄▄  ██▀██ ██▀▀▀   ██  ███▄▄    │             
                            │  ██     ▀███▀ ██ ▀██   ██    ██▀██ ▀████   ██  ▄▄██▀    │             
                            │                                                         │             
                            │                                                         │             
                            │                                                         │             
                            │  ▄████▄ ▄▄▄▄   ▄▄▄  ▄▄ ▄▄ ▄▄▄▄▄▄   ▄█████ ██████ █████▄ │             
                            │  ██▄▄██ ██▄██ ██▀██ ██ ██   ██     ▀▀▀▄▄▄   ██   ██▄▄█▀ │             
                            │  ██  ██ ██▄█▀ ▀███▀ ▀███▀   ██     █████▀   ██   ██     │             
                            │                                                         │             
                            │                                                         │             
                            └─────────────────────────────────────────────────────────┘     
                                  
                                  | At least I think they're fun... don't @ me |


# STP was invented in 1985 by Dr. Radia Perlman and first presented in a research paper titled “An Algorithm for Distributed Computation of a Spanning Tree in an Extended LAN”, long before modern presentation software existed

# Linux appeared in 1991, PowerPoint in 1990, and Keynote in 2003 (hence why I chose to present on a CLI today)

# Early presentations were mostly CLI-based / ASCII, building on command-line interface software developed in the 1960s and 1970s

# STP was standardized as IEEE 802.1D in 1990 and has been widely used in Ethernet networks to prevent loops and ensure reliable communication

# Modern switches can often converge faster than classic STP using Rapid Spanning Tree Protocol (RSTP, IEEE 802.1w) reducing convergence from ~30-50s to 1-10s

# Today, most enterprise networks use RSTP or MSTP, but understanding classic STP is critical for troubleshooting and learning network fundamentals
                                                                             
                                                                            
                                                                            
                                                                            
`

 const thankYouScreen = `
                         
 






                         ▄▄▄▄▄▄▄                                                                   
                         █▀▀██▀▀▀▀ █▄                                                               
                            ██     ██          ▄     ▄▄                                             
                            ██     ████▄ ▄▀▀█▄ ████▄ ██ ▄█▀   ██ ██ ▄███▄ ██ ██                     
                            ██     ██ ██ ▄█▀██ ██ ██ ████     ██▄██ ██ ██ ██ ██                     
                            ▀██▄  ▄██ ██▄▀█▄██▄██ ▀█▄██ ▀█▄  ▄▄▀██▀▄▀███▀▄▀██▀█                     
                                                                ██                                  
                                                              ▀▀▀                                   
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                         ▄▄                             
                                                       ▄█▀▀█▄                           
                                                       ██  ██         ▄          ▄      
                                                       ██▀▀██   ▄█▀█▄ ████▄██ ██ ████▄  
                                             ▀▀▀▀    ▄ ██  ██   ██▄█▀ ██   ██▄██ ██ ██  
                                                     ▀██▀  ▀█▄█▄▀█▄▄▄▄█▀  ▄▄▀██▀▄██ ▀█  
                                                                             ██         
                                                                           ▀▀▀          
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  



                                                  
                                                | CTRL+C to Exit |

                            Repository: https://github.com/OrkoTheMage/Network-CLI-Presenter
`
export const diagrams = [startScreen, baseDiagram, bpduDiagram, rbDiagram, portDiagram, factsScreen, thankYouScreen]
