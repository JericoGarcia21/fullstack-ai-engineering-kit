# Training, fine-tuning, and MLOps

Read only when the project trains or fine-tunes a model. Ordinary model API integration does not need a training pipeline.

## Justify training

Compare a deterministic or pretrained baseline, prompt improvements, and retrieval as applicable. Define the failure training is meant to address. Fine-tuning is not a dependable way to maintain frequently changing facts or enforce access control. Confirm compute budget, data rights, privacy, labeling ownership, and deployment/maintenance responsibility before starting paid jobs.

## Data and experiments

Version data provenance, extraction/labeling rules, preprocessing, features, and split logic. Split by time, user, entity, or group where required to prevent leakage; do not assume a random row split is valid. Keep a held-out test set untouched by tuning. Check imbalance, duplicates, missing values, sensitive attributes, and label quality.

Record code revision, dependencies, random seeds where supported, hyperparameters, hardware, training data version, checkpoints, and metrics. Seeds alone do not guarantee identical results across hardware or distributed runs. Bound resource use and preserve recoverable checkpoints where appropriate.

## Validation and serving

Choose metrics from the business error costs and data distribution. For classifiers, inspect relevant precision/recall trade-offs, calibration, and subgroup performance when applicable. Compare with the baseline and report uncertainty. For generative fine-tuning, retain task-specific and adversarial evaluation from [evaluation](evaluation.md).

Validate training/serving preprocessing consistency, model artifact provenance, dependency compatibility, input schema, latency, throughput, and fallback behavior. Treat downloaded models and serialized artifacts as untrusted; avoid unsafe deserialization and review artifact licenses.

Register approved artifacts with evaluation evidence and lineage. Define drift monitoring, ground-truth delay, retraining triggers, rollback, and retirement/deletion. Drift is an investigation signal, not automatic proof that retraining improves outcomes. Automatic retraining still needs validation and an authorized deployment policy.

## Primary reference

[Google Cloud MLOps](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning), public documentation reviewed 2026-10-19. Its lifecycle guidance informs this reference; it does not mandate Google Cloud or prove this toolkit has executed a training pipeline.
