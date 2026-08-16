import Link from "next/link"

export const metadata = {
  title: "Unlearning is a sequence, not an edit",
  description:
    "Cascade unlearning for LLMs: why chaining in-context, LoRA and full fine-tuning leaks across stage transitions, and how reversed self-distillation closes the gap.",
}

export default function SmoothCascadeUnlearning() {
  return (
    <article className="post">
      <p className="post-back">
        <Link href="/blog">← blog</Link>
      </p>

      <header className="post-head">
        <p className="post-meta">2025 · CISPA Helmholtz Center, SprintML lab</p>
        <h1 className="post-title">Unlearning is a sequence</h1>
        <p className="post-standfirst">
          Many machine unlearning papers audit one model against one reference. But if we want to continually
          unlearn, we need to consider the entire sequence of models. The differences
          between consecutive versions are themselves a signal, and can be used to detect forgotten samples.
        </p>
      </header>

      <div className="post-body">
        <h2>The setting</h2>
        <p>

          Due to GDPR and other privacy regulations, users have the right to request that their data be deleted from a model.
          This is expensive to do naively, since exact unlearning requires retraining the model from scratch without the deleted data.
          So model providers need to make their models unlearnable in a more efficient way. 
          One approach is to use a cascade of unlearning mechanisms, where each mechanism is used for a certain number of deletion requests, 
          and then the next mechanism is used for the next batch of requests.

          A provider trains the model on a dataset and then makes it available through an API. 
          The deletion requests come one after another, where the first user exercises his right to be forgotten, 
          then the second user follows, and so forth. Once there have been t deletion requests, the aggregate 
          forget set has reached the size of <em>t</em>. This number of deletion requests is called the unlearn batch size, 
          UBS. The service provider cannot afford to retrain the billion parameter model each time.

        </p>
        <p>
          Three approximate methods are available for unlearning, and each one is a good method depending on 
          the size of the forget set. 
        </p>
        <ul className="post-list">
          <li>
            <strong>In-context unlearning (ICUL).</strong> Add the forget samples to the prompts with reversed labels, 
            alongside some correct samples for support, which prevent the model from collapsing in terms of accuracy. 
            No updates to weights. The cost is one pass-through. 
          </li>
          <li>
            <strong>LoRA with gradient ascent and gradient descent on retain data (GA-GDR).</strong>{" "}
            Medium cost. Capacity runs out when the low-rank update saturates and test accuracy falls.
          </li>
          <li>
            <strong>Full fine-tuning with the same GA-GDR objective.</strong> This is the most expensive method, 
            but the only one whose capacity is not limited.
          </li>
        </ul>
        <p>
          The GA-GDR objective is a weighted difference of the two losses,{" "}
          <span className="post-code">J = α·L_retain − (1−α)·L_forget</span>, both computed on the
          last token prediction. The cascade policy then becomes: choose the least costly mechanism with 
          enough capacity for the current forget set, and re-synthesize from the original fine-tuned weights 
          each time rather than fixing the already broken model.
        </p>
      

        <h1>The leak is in the transition</h1>
        <p>
          Each mechanism moves a forgotten sample&apos;s loss in a different direction, and by a
          different amount.
        </p>
        <p>
          ICUL never touches the weights. It suppresses the forget response through conditioning
          only, so the underlying loss on a memorized sample stays close to its memorized value.
          The sample remains a detectable member. The stage <em>under-unlearns</em>, as we can see 
          in the accuracy: across forget-set sizes 20–200, ICUL leaves forget accuracy at 0.906–0.928, 
          close to the ~0.92 a model that never saw the sample scores on held-out data.
        </p>
        <p>
          Gradient ascent does the opposite. It explicitly maximizes the forget loss, so after a
          LoRA or full fine-tuning stage the same sample sits in the right tail of the loss
          distribution, above where a genuine non-member would sit. LoRA drives forget accuracy
          to 0.725-0.755, below the ~0.92 held-out level a genuine non-member would achieve. The stage{" "}
          <em>over-unlearns</em>.
        </p>
        <p>
          A true non-member is subject to neither force. It stays put across the transition.
        </p>
        <p>
          So the auditor gets a differential signal for free. Take the stable logit score{" "}
          <span className="post-code">s(x) = log p(y|x) / (1 − p(y|x))</span> under stage{" "}
          <em>k</em>, and look not at the level but at the displacement{" "}
          <span className="post-code">Δ = s_(k+1)(x) − s_k(x)</span>. For non-members Δ
          concentrates near zero. For forget samples it is systematically negative, because the
          sample migrates from an under-unlearned regime to an over-unlearned one. Nothing in
          either stage&apos;s own objective mentions this. Each stage can look perfectly
          defensible in isolation.
        </p>

        <h2>Measuring it</h2>
        <p>
          We extended ForgetLiRA so that the test statistic is a <em>pair</em> of stages rather
          than a single one. Train 10 shadow models, each on a random half of the candidate pool.
          For each shadow model, we run both cascade stages on the same forget set, producing the
          pair of published models a real user would see. Score the target sample under both, fit
          Gaussians to the in and out populations of the resulting 2-vector, and take the
          likelihood ratio. Privacy risk is reported as TPR at 1% FPR, forget data as members
          against held-out test data as non-members. Exact unlearning would score 0.5 AUC and 1%
          TPR.
        </p>
        <p>The result at UBS 100, on the LoRA to full fine-tuning transition:</p>

        <div className="post-table-wrap">
          <table className="post-table">
            <thead>
              <tr>
                <th>Stage k+1 objective</th>
                <th>Cross AUC</th>
                <th>Excess</th>
                <th>Forget</th>
                <th>Eval</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GA-GDR, no alignment</td>
                <td>0.5334</td>
                <td>+0.0074</td>
                <td>0.9300</td>
                <td>0.9192</td>
              </tr>
              <tr>
                <td>+ RSD, batch mean</td>
                <td>0.5253</td>
                <td>−0.0009</td>
                <td>0.9300</td>
                <td>0.9217</td>
              </tr>
              <tr>
                <td>+ RSD, per-sample</td>
                <td>0.5222</td>
                <td>−0.0037</td>
                <td>0.9317</td>
                <td>0.9200</td>
              </tr>
            </tbody>
          </table>
          <p className="post-caption">
            Cross AUC is the audit of the pair of published models. Excess is that AUC minus the
            better of the two single-stage audits, so a positive value means observing both
            versions leaks more than observing either alone. Averaged over 6 shadow models.
          </p>
        </div>

        <p>
          The excess of +0.0074 is what is alarming. A user who keeps both
          published checkpoints learns more about the forget set than a user who keeps either
          one. The ICUL to LoRA transition shows the same pattern, AUC 0.524 ± 0.013 against
          0.538 ± 0.007 for LoRA to full fine-tuning, both above the 0.5 that exact unlearning
          would give.
        </p>
        <h2>Reversed self-distillation</h2>
        <p>
          The signal is due to the shift. We don't need to make any single stage more private. 
          We need consecutive stages to{" "}
          <em>agree</em> on the forget set. So treat the transition as a constrained
          optimization: perform the new stage&apos;s unlearning, subject to reproducing the
          previous stage&apos;s behavior on everything already forgotten.
        </p>
        <p className="post-eq">
          L_RSD(θ) = −a₁·ℓ_f(θ) + a₂·ℓ_r(θ) + a₃·‖ℓ_f(θ_k) − ℓ_f(θ)‖₂ + a₄·‖ℓ_r(θ_k) − ℓ_r(θ)‖₂
        </p>
        <p>
          with the previous stage θ_k frozen as teacher. The first two terms are the usual
          weighted GA-GDR. The last two align the incoming stage to its predecessor on forget and
          retain data respectively.
        </p>
        <p>
          It is <em>reversed</em> in two directions at once. In capacity, because the teacher is
          the weaker, cheaper, lower-capacity model and the student is the stronger one, which is
          backwards from ordinary distillation. And in objective, because standard distillation
          transfers competence, whereas here we transfer a specific <em>incompetence</em>: the
          previous stage&apos;s already-published behavior on deleted data.
        </p>
        <p>
          The alignment is on losses. The teacher contributes one scalar per sample. That is a much weaker
          constraint than matching full predictive distributions, and it is far cheaper: the
          teacher&apos;s per-sample losses are computed once, cached, and then the teacher is
          discarded, so only one model is resident during training. Second, both splits are
          aligned. Holding only the forget losses fixed would leave the retain losses free to
          drift, and drift on the retain set is itself a cross-stage signal, since the audit
          contrasts the two populations.
        </p>

        <h2>What it costs</h2>
        <p>
          Essentially nothing, which was the surprise. At the best weight setting,{" "}
          <span className="post-code">(a₁,a₂,a₃,a₄) = (0.05, 0.95, 0.5, 0.5)</span>, we get 0.9743
          forget accuracy and 0.9074 held-out accuracy, within 3.5 points of the 0.9421 reached
          by a base model that has not unlearned anything at all. Retain accuracy never drops
          below 0.9975 against the base model&apos;s 0.9990, so the cost of alignment falls on
          generalization rather than on retained training data, and it is bounded.
        </p>
        <p>
          The sweep is also remarkably flat. Across a₁ in [0.05, 0.30], forget accuracy stays in
          [0.9728, 0.9743] and held-out accuracy in [0.9014, 0.9074]. Moving the alignment split
          (a₃, a₄) from (0.5, 0.5) to (0.8, 0.2) moves held-out accuracy by less than a point. The
          method is not sensitive to how alignment effort is divided between the forget and
          retain terms, which is a nice property for something you would actually deploy. The one
          setting that fails is a₁ = 0.01, which puts almost no weight on the ascent term and
          collapses held-out accuracy to 0.8468.
        </p>

        <h2>Limitations</h2>
        <p>
          The specific numbers are small and the study is narrow: one 1B model, one classification
          task, thresholds measured for exactly this configuration.
        </p>
        <p>
          But the framing generalizes past the experiment. Every unlearning audit I know of
          evaluates one model against one reference. A provider that changes mechanism mid-stream
          publishes several, and an adversary is free to combine them. Deletion in deployment is a
          temporal process, and its privacy has to be audited over the sequence
          of published models. 
        </p>

        <p className="post-footnote">
          Part of the work was done in the SprintML lab at CISPA with other contributors, then continued independently by myself.
        </p>
      </div>
    </article>
  )
}
