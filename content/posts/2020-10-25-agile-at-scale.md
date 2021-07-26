---
title: 规模化敏捷需求协作
date: 2020-10-25
---

  
在敏捷开发中，我们用Product Backlog来承载需求的集合，里面包括需求的优先级以及排序等。进入迭代后用Sprint Backlog来表示迭代内的需求和任务。单个需求用User Story卡片来沟通。高效需求协作在团队规模较小时比较容易开展，但如果团队上了规模，多团队间怎么有效的进行需求沟通，怎么在多团队间进行高效的需求协作呢？以下分三种规模的敏捷团队进行探讨。  
  
  

## 1.单团队敏捷  
  
在单团队敏捷中，采用典型的端到端交付敏捷特性团队，整个团队可以完成从需求到产品开发上线等一系列事情。从需求协作的角度来说，一般会经历3个重要的会议：  
  
1.Product Backlog Refinement工作坊  
  
2.Sprint Planning 1 会议  
  
3.Sprint Planning 2 会议  
  
Product Backlog Refinement（PBR）工作坊，主要用于业务方，PO，用户，和团队一起了解下阶段业务目标，分析产品功能以支持业务目标，并对User Story进行拆分，组合，初步估算，同时对Product Backlog进行优先级排序  
  
Sprint Planning 1 会议，PO和团队设定迭代目标，确定迭代内能完成多少User Story卡片，对卡片模糊部分进行再次澄清，对卡片进行再次估算和调整  
  
Sprint Planning 2 会议，团队创建Sprint Backlog，并对迭代内要做的User Story卡片进行任务拆分，估算任务时间，同时领取任务（有些团队采用将Sprint Planning 1&2会议合并为一个会议）  
  
会议发生时间线如图：  
   
![](/images/2020-10-25-agile-at-scale/sprint-planning.png)  
  
可以看出PBR会议在整个迭代期间多次进行，主要集中在迭代后期举行比较多，Sprint Planning会议一般集中在迭代第一天进行，但也有将Sprint Planning 1 会议在前一个迭代末进行，Sprint Planning 2在新迭代开始进行，这就是迭代内敏捷需求协作开展的活动。  
  
  

## 2.多团队敏捷  

随着市场增长，对产品功能需求增多，产品特性上线时间要求更急迫，单个团队无法满足市场对软件推出速度的期望，这时就需要建立多个敏捷团队并行迭代开发。而且多个团队之间的需求可能具有依赖关系，这时需求协作就比单个敏捷团队复杂一些。敏捷团队结构可以有多种变化。针对PO角色来说一般有3种团队结构。  
  
最常见的一种是多个团队之间有主PO（CPO），每个团队内部有各自的团队PO（TPO）。  
  
![](/images/2020-10-25-agile-at-scale/less_team1.png)
  
第一种PO组织方式-CPO和Team PO  
  


在这种团队结构中，CPO负责整体Product Backlog的梳理，TPO负责迭代内需求的卡片的细化，为团队澄清需求，以及团队间依赖需求的协作沟通  
  
  

第二种是多团队之间有主PO（CPO），团队内部不再安排团队PO（TPO）。  

![](/images/2020-10-25-agile-at-scale/less_team2.jpg)

第二种PO组织方式-CPO  
  
  

这种结构要求团队和CPO紧密协作，CPO负责整体Product Backlog的安排，同时团队经常参与Product Backlog Refinement和CPO一起进行Product Backlog的梳理。团队也需要经常和业务方进行沟通，了解产品业务目标，以及设计怎样的产品方案以满足业务目标。在这种组织结构下团队对产品方案有更多的设计决策权。  
  
  

第三种是无主PO，团队里面有团队PO。  

  

![](/images/2020-10-25-agile-at-scale/less_team3.png)
  
第三种PO组织方式-只有团队PO  
  
  

这种方式并不推荐，但经常出现在采用敏捷的组织结构中，这个组织结构很容易造成团队各自为政，每个TPO只考虑自己团队的需求，需求依赖的团队间需求协作效率降低。容易出现A团队由于依赖B团队的一个需求，而产生等待现象。  
  
  

不管是哪种团队结构，有个原则是一个产品只建立一个Product Backlog，而不管内部有多少个敏捷特性团队。这里容易出现的敏捷反模式是每个团队都有一个Product Backlog.试想一下针对一个产品每个团队都有自己的PB，就会出现每个团队只关心团队内的PBI，失去对产品全景的理解，同时对PBI的排序只会针对本团队需求进行局部排序优化，缺乏对整个产品需求优先级进行调整的灵活性。而第三种PO结构最容易出现每个团队一个PB，没有一个统一的PB，团队间为了对齐需求花费大量沟通协调成本。  
  
  

在多团队敏捷中需求协作活动大致有如下几种：  
  
1.总体Product Backlog Refinement工作坊  
  
2.单团队或多团队Product Backlog Refinement工作坊  
  
3.总体Sprint Planning 1 会议  
  
4.单团队或多团队Sprint Planning 2 会议  
  
总体Product Backlog Refinement工作坊，由主PO发起，团队PO，团队代表，业务方等一起参加，主要对下迭代涉及到的Epic进行沟通，拆分，同时每个团队选取Epic或User Story卡片进行后续单团队或多团队Product Backlog Refinement工作坊分析，识别团队间需求的依赖关系  
  
单团队或多团队Product Backlog Refinement工作坊，需求间没有依赖的团队举行单团队PBR工作坊，团队内部进行Epic或User Story沟通，拆分，估算等，如果是需求间有依赖的多个团队，则举行多团队PBR，多个团队一起分析，沟通，拆分，并估算依赖部分的User Story  
  
总体Sprint Planning 1   会议，主PO，团队PO，团队代表一起参加，之前已经举行了PBR工作坊，再次对剩余模糊的需求问题进行澄清，同时多团队领取下迭代User Story卡片  
  
单团队或多团队Sprint Planning 2 会议，领取比较独立US卡片的团队召开单团队Sprint Planning 2 会议（和单敏捷团队的会议一致），领取卡片有关联关系的多个团队间举行多团队Sprint Planning 2 会议，团队间创建各自的Sprint Backlog，针对依赖部分进行集体澄清，估算，优先级调整，比较独立部分则团队各自进行澄清，估算。  

  
这些会议开展时间，如总体Product Backlog Refinement，单团队或多团队PBR工作坊会在一个迭代中持续开展，针对下个迭代的User Story进行沟通，拆分，AC编写，实例化需求编写。而总体Sprint Planning会议和单团队或多团队Sprint Planning 2 会议是在迭代第一天依次开展针对本迭代需求进行最后澄清，还有就是任务分解，评估，团队领取卡片等。  
  
  

## 3.规模化敏捷团队  

产品进一步扩大，团队进一步扩充，现在一个产品可能由几十上百个团队，上千人一起协作开发。这时多敏捷团队模式无法高效进行协作，需求沟通效率降低。我们需要对组织结构进一步升级，对产品和团队进行领域划分。每个产品会产生多个领域，每个领域里面由8～10个团队在里面协作开发，同时多个领域并行开发，所有团队采用统一迭代的方式（迭代起止时间相同）。那么在需求协作方面有哪些变化呢？我们先来看看团队组织结构的变化：  
  


![](/images/2020-10-25-agile-at-scale/less.png)
  
规模化敏捷组织  
  
  

在规模化团队的场景里，我们有个主PO（CPO），下面分别有领域PO（APO）进行协助，同时APO下面可能会有团队PO（TPO）。这时需求量变得庞大，有些组织继续使用每个产品一个Product Backlog的优秀实践，同时辅以User story mapping进行产品规划，还有些组织采用一个主Product Backlog，并拆分出几个Area Product Backlog，因为领域之间一般没有太多需求交集，不需要花很多时间对齐Area Product Backlog。在规模化敏捷里面，有点需要注意的是虽然敏捷里面推荐端到端的全特性团队，但在规模化的产品里会有中台或者PAAS等横向平台级的团队出现（如上图黄色部分），单个团队很难端到端完成整体需求交付，一个需求会跨越多个团队协作开发才能完成，规模化需求协作活动会有如下变化：  
  
1.Product Owner 团队会议  
  
2.领域总体Product Backlog Refinement工作坊  
  
3.领域单团队或多团队Product Backlog Refinement工作坊  
  
4.领域总体Sprint Planning 1 会议  
  
5.领域单团队或多团队Sprint Planning 2 会议  
  
  

新增Product Owner 团队会议--CPO，APO，TPO参加，用来对齐组织战略，业务目标，产品目标，领域之间需要协作部分的讨论，同时拟定发布计划，一般每个迭代举行一次，为下个迭代的产品需求进行沟通。  
  
后面4个活动和“多敏捷团队“里面的活动基本一样，要注意的一点是，这些活动要让平台级团队TPO或技术代表参加，特别平台级团队横跨多个领域，就需要派团队代表参加所有涉及领域的会议，因为上层业务团队是平台级团队的用户。  
  
  

最后简述CPO，APO的职责：  
  
CPO作为主PO，负责产品方向，对齐公司战略和业务目标，对产品级的Product Backlog有决定权，并定义优先级，召开Product Owner 团队会议。还有就是参与评估Sprint review会议等。  
  
APO作为领域PO，维护Product Backlog的领域部分，或者Area Product Backlog，参与Product Owner 团队会议，为Area Product Backlog优先级排序， 为多个团队澄清领域内需求，参与领域总体Product Backlog Refinement工作坊，领域总体Sprint Planning 1 会议。  
  
  
  
后记，XP和scrum提出的时候对大规模采用敏捷并无太多考虑，如果简单套用这些方法，会出现单团队的情况下效果提升，规模化后效率并不理想，就像一个巨人发育不良，左手大，右脚小，规模化敏捷还处于摸索状态，对银弹的摸索不会停歇，组织在采用规模化敏捷的道路上，会遇到各种问题，解决这些问题的核心思想是敏捷和精益的文，根据这些可以创造出属于自己且多样性的敏捷实践。  
