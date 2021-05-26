using Grpc.Core;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrpcService1
{
    public class GreeterService : Greeter.GreeterBase
    {
        private readonly ILogger<GreeterService> _logger;
        public GreeterService(ILogger<GreeterService> logger)
        {
            _logger = logger;
        }

        public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
        {
            return Task.FromResult(new HelloReply
            {
                Message = "Hello " + request.Name
            });
        }
        public override async Task SayHelloStream(HelloRequest request, IServerStreamWriter<HelloReply> responseStream, ServerCallContext context)
        {
            var test = new string[] { "Hello", "Hi", "Hallo", "Tag"," N'Abend" };

            var index = 0;
            while (true)
            {
                if (context.CancellationToken.IsCancellationRequested)
                {
                    break;
                }
                await responseStream.WriteAsync(new HelloReply { Message = test[index] } );
                index = (index + 1) % test.Length;
                await Task.Delay(TimeSpan.FromSeconds(1));
            }
        }
    }
}
