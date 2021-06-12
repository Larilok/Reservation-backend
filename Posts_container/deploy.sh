#!/bin/bash

gcloud builds submit --tag gcr.io/{$PROJECT_ID}/posts .