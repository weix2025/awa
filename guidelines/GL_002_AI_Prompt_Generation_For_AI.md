# 指南: 设计由AI生成、用于指导其他AI的User Prompt

*   **文档ID**: `GL_002_AI_Prompt_Generation_For_AI`
*   **版本**: 1.0
*   **创建日期**: `2025-05-14`
*   **目标**: 规范如何让一个“规划型AI”生成结构化、信息全面的User Prompt，以指导“执行型AI”高效完成子任务并按要求记录工作。

## 1. 核心理念：AI驱动的任务分解与指导

在复杂项目中，可引入一个“规划型AI”（或由具备规划能力的人工操作者扮演），其职责是将高层级的用户目标分解为更小、可管理的子任务。对于每个子任务，“规划型AI”将生成一个详细的User Prompt，作为对“执行型AI”的工作指令。

## 2. User Prompt 的关键构成要素

“规划型AI”在生成指导性User Prompt时，应确保包含以下信息：

*   **清晰的子任务目标 (Clear Sub-task Objective)**:
    *   明确指出“执行型AI”需要完成的具体工作。
    *   示例: "实现 `src/net/quic/congestion_control.rs` 中的 `on_ack_received` 函数。"

*   **必要的背景与上下文 (Essential Context)**:
    *   项目信息: 例如，"当前项目为 may-crate-src QUIC 实现。"
    *   相关文档引用: 链接到RFC ([`quic-rfc9000.txt`](../../quic-rfc9000.txt))、设计文档、API文档等。
    *   相关代码模块引用: 链接到项目中其他相关的代码文件或目录。
    *   主工作流/状态文档引用: 例如，链接到 [`completed_subtask.md`](../../completed_subtask.md)。
    *   前置/相关日志引用: 链接到 `workflow_details/` 中与当前子任务相关的先前分析、错误报告或决策日志。

*   **具体执行要求 (Specific Execution Requirements)**:
    *   详细步骤或需要考虑的关键技术点。
    *   示例: "确保你的实现考虑到XYZ..."
    *   对代码风格、错误处理、性能等方面的特定要求（如果适用）。

*   **工具使用建议 (Optional Tool Usage Hints)**:
    *   如果某个子任务明显适合使用特定工具（如 `apply_diff`, `search_files`），可以在Prompt中提示。

*   **预期产出与格式 (Expected Deliverables & Format)**:
    *   明确“执行型AI”需要产出什么：代码变更、分析报告、新的日志文件等。
    *   **日志记录要求**:
        *   明确指示需要按照 "V2.1 Log 内容规范" ([`GL_001_AI_Log_Generation_Training.md`](./GL_001_AI_Log_Generation_Training.md)) 生成日志。
        *   提供建议的日志文件名 (符合规范)。
        *   强调日志内容中需要包含的关键信息（如设计思路、实现步骤、测试情况）。
        *   提醒在日志的“关联网络”部分链接回本User Prompt（如果可能的话，或其代表的任务ID）以及其他相关信息。

*   **反馈与沟通机制**:
    *   提示“执行型AI”在遇到问题或完成任务时如何反馈。

## 3. User Prompt 模板示例 (供“规划型AI”参考)

```
[USER_PROMPT_FOR_EXECUTING_AI]
项目: may-crate-src QUIC 实现
任务签发者: [规划型AI/用户]
签发时间: YYYY-MM-DD HH:MM

---------------------------------------------------------------------
**子任务ID**: [例如: CC_001_OnAckReceived]
**任务类型**: [代码实现/模块分析/Bug修复/文档撰写]
**目标**: [例如: 实现 `src/net/quic/congestion_control.rs` 中的 `on_ack_received` 函数，用于处理ACK帧并更新拥塞窗口。]

**背景与上下文**:
*   **RFC参考**: [`quic-rfc9000.txt`](../../quic-rfc9000.txt) (特别是 Section A.B 关于拥塞控制的部分)
*   **相关模块**:
    *   连接状态: [`src/net/quic/conn.rs`](../../src/net/quic/conn.rs)
    *   ACK帧处理: [`src/net/quic/frame.rs`](../../src/net/quic/frame.rs) (AckFrame 定义)
    *   (若有) 前置分析日志: [[拥塞控制初步分析]](<../../workflow_details/YYYYMMDD_HHMMSS_SEQ_ANLS_CongestionControl_Overview.md>)
*   **主工作流**: [`completed_subtask.md`](../../completed_subtask.md)

**具体执行要求**:
1.  在 `src/net/quic/congestion_control.rs` 中定义或修改 `on_ack_received(...)` 函数。
2.  函数应能正确处理传入的 ACK 信息，更新 CWND, SSTHRESH 等拥塞控制参数。
3.  考虑实现慢启动、拥塞避免等阶段的逻辑。
4.  请使用 `apply_diff` 工具提交你的代码变更。

**预期产出**:
1.  符合上述要求的代码实现。
2.  一份详细的 TASK 类型日志，记录你的完整工作过程：
    *   **文件名**: `YYYYMMDD_HHMMSS_SEQ_TASK_CC_OnAckReceived.md` (请替换为实际时间戳和序列号)
    *   **内容**: 遵循 "V2.1 Log 内容规范" ([`GL_001_AI_Log_Generation_Training.md`](./GL_001_AI_Log_Generation_Training.md))。
        *   在“概述/背景/目标”中总结此任务。
        *   在“详细过程”中记录你的设计思路、关键实现步骤、遇到的挑战及解决方案。
        *   在“结果/结论”中总结完成情况和测试结果（如有）。
        *   在“关联网络”中，链接回本任务指令（或任务ID CC_001_OnAckReceived）及其他你参考或修改的文件/日志。

请开始执行。如遇不明确之处，请提出。完成后请通知。
---------------------------------------------------------------------
[/USER_PROMPT_FOR_EXECUTING_AI]
```

## 4. 工作流程优势

*   **标准化**: 确保“执行型AI”获得一致且全面的任务输入。
*   **效率提升**: 减少“执行型AI”在理解任务和需求上的模糊性。
*   **质量控制**: 通过明确的产出和日志要求，提升工作成果的规范性和可追溯性。
*   **任务分解与并行化**: 为更复杂的任务分解和潜在的并行处理（由不同AI实例执行）奠定基础。
*   **自动化潜力**: 未来甚至可以探索让“规划型AI”根据项目状态和依赖关系自动生成和调度这一系列User Prompt。

通过实施这种AI生成指导性User Prompt的机制，可以构建更强大、更具扩展性的AI协作工作流。