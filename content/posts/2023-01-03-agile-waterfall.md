---
title: “敏捷”与“瀑布”，在中国还真相遇过，只不过不是你认为的方式
date: 2023-01-03
---

最近敏捷圈发起一阵讨论：敏捷、瀑布，在中国存在过吗，不禁思考在中国敏捷与瀑布，真没相遇过吗？

2000年前后,CMM思想流入中国，01年《程序员》杂志开始以《CMM布道中国》为专题进行一系列讲述。从这时起CMM在中国如火如荼的发展，IPD-CMMI一度成为众多企业的学习对象。在这股思潮下，软件开发以瀑布V模型为主，该流程要求软件发现缺陷后，需向上回溯到最早缺陷引入点，随后从缺陷引入点开始进行一系列后续变更。举个例子在测试阶段发现程序缺陷，通过分析后得知是需求文档描述有误，那么需要先变更需求文档，接着变更概要设计，详细设计，测试用例，代码修改，单元测试，代码评审，最后该功能重新进入测试阶段。

这个流程里需求分析，开发，测试人员通常属于各自职能部门，由于职能竖井（KPI，部门墙等），软件开发过程中经常需要开会协调。但只要时间充足，上线软件倒也质量尚可。但问题就出在时间充足这个假设前提，当时中国IT企业大多是以倒排期和版本火车方式进行项目计划。团队成员在同一时间会投入到多个软件版本中，时间紧，任务重，同时白天大部分时间又用于开会和扯皮，晚上才能安静的进行软件开发，长此以往团队陷入软件泥潭，疲惫不堪。

这时团队往往采取流程裁剪这样的骚操作，概要设计，详细设计，测试用例，单元测试，代码评审等非直接编码活动统统拆剪掉。剩下哪些活动呢？总得有需求文档吧，不然团队用什么开发，最主要的编码活动不能裁剪掉，就这两个活动就可以交付软件了，可团队TL心里没底啊，测试环节也留下。于是乎V模型只剩下“需求-开发-测试”三个活动。如果企业流程不能随意裁剪，那么你仔细观察上线前一天团队在做什么，就会发现所有团队成员都在补写文档，至于这些文档和当前上线代码有什么关系，没人知道。你问这些团队这是什么开发方式，他们会说这是裁剪后的“瀑布流程”。

2008年前后，敏捷思潮开始在企业发芽，《硝烟中的Scrum和XP》和《持续集成》成为敏捷支持者的床头书，迭代增量开发，快速反馈成为敏捷的重要指导思想，上一活动的问题，尽量在下一活动反馈中找到并修复。自动化测试成为保证质量，快速反馈，快速发布的重要标志。团队实在受不了每夜写代码，开始纷纷上马敏捷开发。可是采用敏捷开发，之前的问题就解决了吗？

敏捷宣言第二句“工作的软件高于详尽的文档”，但团队选择性无视左边，专注到右边，你看敏捷不用写任何文档了，一阵欢呼。于是敏捷3355会议开起，需求澄清会议一开就是2，3天，会议室里面坐满黑压压一片，产品经理卖力念着需求文档，团队里三层，外三层各自玩手机。​总算结束，团队开始拆卡片，随后进入迭代开发，后期进入迭代测试。你看这个敏捷开发不就是换了个名词的“敏捷3355+裁剪后的瀑布流程”。久而久之团队开始抱怨，以前瀑布流程的时候可没那么多会议，敏捷开发咋那么烦琐，要不我们也把迭代演示，迭代回顾，代码评审，自动化测试，小批量交付等裁剪了，最后敏捷开发成为迭代进行的“需求-开发-测试”三个活动。你问这些团队这是什么开发方式，他们会说这是“敏捷开发”。

你看中国企业采取了”瀑布流程“、”敏捷开发“，怎么最后都是一个样子？这里原因很多，有人认为是企业倒排期文化，有人认为是需求变化太快，但有一个很重要的问题，团队里面真的是合格程序员吗？真的理解计算机科学吗？以下一些问题作为参考:  

* 哪些算法，语言设计，操作系统，分布式计算，运用了fork-join思想？
* Java为什么放弃绿色线程，现在为什么又要开始支持虚拟线程？
* 设计模式，面向对象编程是灵丹妙药吗？
* 你写的代码会覆盖必要的单元测试吗？

抽象能力是计算机基础，编程语言，框架，系统，硬件进行大量的抽象，尽量隐藏细节，但并不意味着你可以不理解计算机基础，就到处调用框架，运用大量并发技术。深入团队编码，会发现并不是团队不愿意写单元测试，而是团队写的代码根本无法测试，更不用说从未写过单元测试。

选人的时候，从未考虑候选人计算机基础能力，编码内功，只要这个人能尽快上手项目就行，这个语言，那个框架玩的飞起来。你仔细观察这些团队，会发现他们的流程再次升级，变成“需求-拷贝、粘贴-人肉点点点”。中国IT发展了20,30年，系统升级了，语言升级了，框架升级了，工具也升级了，可团队能力升级了吗？

  
    


