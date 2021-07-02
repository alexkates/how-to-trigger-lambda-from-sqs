import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';

export class HowToTriggerLambdaFromSqsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'OurSqsQueue', {
      queueName: 'OurSQSQueue',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'SqsMessageHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    const eventSource = new lambdaEventSources.SqsEventSource(queue);

    lambdaFunction.addEventSource(eventSource);
  }
}